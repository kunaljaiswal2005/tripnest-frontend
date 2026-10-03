import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { documentAPI, tripAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const DOC_TYPES = [
    { value: 'FLIGHT_TICKET',    label: 'Flight Ticket',   emoji: '✈️' },
    { value: 'HOTEL_BOOKING',    label: 'Hotel Booking',   emoji: '🏨' },
    { value: 'TRAIN_TICKET',     label: 'Train Ticket',    emoji: '🚂' },
    { value: 'BUS_TICKET',       label: 'Bus Ticket',      emoji: '🚌' },
    { value: 'TRAVEL_DOCUMENT',  label: 'Travel Document', emoji: '📄' },
    { value: 'ITINERARY',        label: 'Itinerary',       emoji: '🗺️' },
    { value: 'PHOTO',            label: 'Photo',           emoji: '📸' },
    { value: 'EXPENSE_RECEIPT',  label: 'Expense Receipt', emoji: '🧾' },
    { value: 'OTHER',            label: 'Other',           emoji: '📁' },
];

const FILTERS = [
    { value: 'ALL',   label: 'All Files' },
    { value: 'PHOTO', label: 'Photos'    },
    { value: 'FLIGHT_TICKET',   label: 'Tickets'   },
    { value: 'HOTEL_BOOKING',   label: 'Bookings'  },
    { value: 'EXPENSE_RECEIPT', label: 'Receipts'  },
    { value: 'OTHER',           label: 'Others'    },
];

const Documents = () => {
    const { id: tripId } = useParams();
    const navigate       = useNavigate();
    const { user }       = useAuth();
    const fileInputRef   = useRef(null);

    const [trip, setTrip]               = useState(null);
    const [documents, setDocuments]     = useState([]);
    const [loading, setLoading]         = useState(true);
    const [uploading, setUploading]     = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [filter, setFilter]           = useState('ALL');
    const [activeTab, setActiveTab]     = useState('docs');
    const [showUpload, setShowUpload]   = useState(false);
    const [error, setError]             = useState('');
    const [success, setSuccess]         = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl]   = useState(null);

    const [form, setForm] = useState({
        documentType: 'OTHER',
        description:  '',
    });

    // ============================================================
    // FETCH
    // ============================================================

    useEffect(() => {
        fetchData();
    }, [tripId]);

    const fetchData = async () => {
        try {
            const [tripRes, docsRes] = await Promise.all([
                tripAPI.getById(tripId),
                documentAPI.getAll(tripId),
            ]);
            setTrip(tripRes.data);
            setDocuments(docsRes.data);
        } catch {
            navigate('/trips');
        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // FILE SELECT
    // ============================================================

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setError('');

        // Client side validation
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            setError(`File too large: ${(file.size / 1048576)
                .toFixed(1)}MB. Max: 10MB`);
            return;
        }

        const allowed = [
            'image/jpeg', 'image/jpg', 'image/png',
            'image/gif',  'image/webp',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument'
                + '.wordprocessingml.document',
            'text/plain',
        ];

        if (!allowed.includes(file.type)) {
            setError('File type not allowed. Use: images, PDF, Word, text');
            return;
        }

        setSelectedFile(file);

        // Preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setPreviewUrl(e.target.result);
            reader.readAsDataURL(file);

            // Auto set type to PHOTO
            setForm(prev => ({ ...prev, documentType: 'PHOTO' }));
        } else {
            setPreviewUrl(null);
        }
    };

    // ============================================================
    // UPLOAD
    // ============================================================

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setError('Please select a file');
            return;
        }

        setUploading(true);
        setError('');
        setUploadProgress(0);

        try {
            const formData = new FormData();
            formData.append('file',         selectedFile);
            formData.append('documentType', form.documentType);
            formData.append('description',  form.description);

            // Simulate progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 85) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 200);

            const res = await documentAPI.upload(tripId, formData);

            clearInterval(progressInterval);
            setUploadProgress(100);

            // Add to list
            setDocuments(prev => [res.data, ...prev]);

            // Reset form
            setTimeout(() => {
                setShowUpload(false);
                setSelectedFile(null);
                setPreviewUrl(null);
                setUploadProgress(0);
                setForm({ documentType: 'OTHER', description: '' });
                setSuccess('File uploaded successfully!');
                setTimeout(() => setSuccess(''), 3000);
            }, 500);

        } catch (err) {
            setError(err.response?.data?.error
                || 'Upload failed! Try again.');
            setUploadProgress(0);
        } finally {
            setUploading(false);
        }
    };

    // ============================================================
    // DELETE
    // ============================================================

    const handleDelete = async (docId) => {
        if (!window.confirm('Delete this file?')) return;
        try {
            await documentAPI.delete(docId);
            setDocuments(prev =>
                prev.filter(d => d.id !== docId));
            setSuccess('File deleted!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error
                || 'Delete failed!');
        }
    };

    // ============================================================
    // HELPERS
    // ============================================================

    const getDocTypeInfo = (type) =>
        DOC_TYPES.find(t => t.value === type)
            || { emoji: '📁', label: 'Other' };

    const isImage = (fileType) =>
        fileType && fileType.startsWith('image/');

    const canDelete = (doc) =>
        doc.uploadedByEmail === user?.email
            || trip?.ownerEmail === user?.email;

    const filteredDocs = documents.filter(doc => {
        if (filter === 'ALL') return true;
        return doc.documentType === filter;
    });

    const photos = documents.filter(d =>
        d.documentType === 'PHOTO');

    // ============================================================
    // LOADING
    // ============================================================

    if (loading) return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="flex justify-center items-center h-64">
                <p className="text-slate-400">Loading...</p>
            </div>
        </div>
    );

    // ============================================================
    // RENDER
    // ============================================================

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-5xl mx-auto px-4
                             sm:px-6 pt-24 sm:pt-28 pb-12">

                {/* ================================================
                    HEADER
                ================================================ */}
                <div className="mb-6">
                    <button
                        onClick={() =>
                            navigate(`/trips/${tripId}`)}
                        className="text-slate-400 text-sm
                                   hover:text-slate-600 flex
                                   items-center gap-1 mb-4"
                    >
                        ← Back to trip
                    </button>

                    <div className="flex justify-between
                                    items-start">
                        <div>
                            <h1 className="text-2xl font-bold
                                           text-slate-900">
                                Documents & Photos 📂
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                {trip?.title} —
                                {' '}{documents.length} file(s)
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setShowUpload(!showUpload);
                                setError('');
                            }}
                            className="bg-blue-600 text-white
                                       px-4 py-2 rounded-xl text-sm
                                       font-medium hover:bg-blue-700
                                       transition flex items-center
                                       gap-2"
                        >
                            <span>+</span> Upload File
                        </button>
                    </div>
                </div>

                {/* ================================================
                    SUCCESS / ERROR
                ================================================ */}
                {success && (
                    <div className="mb-4 bg-green-50 border
                                    border-green-200 text-green-700
                                    rounded-xl px-4 py-3 text-sm">
                        ✅ {success}
                    </div>
                )}
                {error && (
                    <div className="mb-4 bg-red-50 border
                                    border-red-200 text-red-600
                                    rounded-xl px-4 py-3 text-sm">
                        ⚠️ {error}
                    </div>
                )}

                {/* ================================================
                    UPLOAD FORM
                ================================================ */}
                {showUpload && (
                    <div className="bg-white border border-blue-100
                                    rounded-2xl p-6 mb-6 shadow-sm">
                        <h2 className="font-semibold text-slate-800
                                       mb-4">
                            Upload New File
                        </h2>

                        <form onSubmit={handleUpload}
                              className="space-y-4">

                            {/* File Drop Zone */}
                            <div
                                onClick={() =>
                                    fileInputRef.current?.click()}
                                className={`border-2 border-dashed
                                    rounded-xl p-8 text-center
                                    cursor-pointer transition
                                    ${selectedFile
                                        ? 'border-blue-400 bg-blue-50'
                                        : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    accept="image/*,.pdf,.doc,
                                            .docx,.txt"
                                />

                                {/* Image Preview */}
                                {previewUrl ? (
                                    <div className="flex flex-col
                                                    items-center gap-3">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-32 h-32
                                                       object-cover
                                                       rounded-xl"
                                        />
                                        <p className="text-sm
                                                      font-medium
                                                      text-slate-700">
                                            {selectedFile?.name}
                                        </p>
                                        <p className="text-xs
                                                      text-slate-400">
                                            {selectedFile &&
                                                (selectedFile.size
                                                / 1048576)
                                                .toFixed(1)}MB
                                        </p>
                                    </div>
                                ) : selectedFile ? (
                                    <div className="flex flex-col
                                                    items-center gap-2">
                                        <span className="text-4xl">
                                            📄
                                        </span>
                                        <p className="text-sm
                                                      font-medium
                                                      text-slate-700">
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-xs
                                                      text-slate-400">
                                            {(selectedFile.size
                                            / 1048576).toFixed(1)}MB
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col
                                                    items-center gap-2">
                                        <span className="text-4xl">
                                            📤
                                        </span>
                                        <p className="text-sm
                                                      font-medium
                                                      text-slate-600">
                                            Click to select file
                                        </p>
                                        <p className="text-xs
                                                      text-slate-400">
                                            Images, PDF, Word, Text
                                            — Max 10MB
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Document Type */}
                            <div>
                                <label className="block text-sm
                                    font-medium text-slate-700 mb-2">
                                    Document Type
                                </label>
                                <div className="grid grid-cols-3
                                                sm:grid-cols-5 gap-2">
                                    {DOC_TYPES.map(type => (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => setForm(
                                                prev => ({
                                                    ...prev,
                                                    documentType:
                                                        type.value
                                                }))}
                                            className={`p-2 rounded-xl
                                                border text-center
                                                transition text-xs
                                                ${form.documentType
                                                    === type.value
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-slate-200 text-slate-600 hover:border-blue-300'}`}
                                        >
                                            <div className="text-lg mb-1">
                                                {type.emoji}
                                            </div>
                                            <div className="leading-tight">
                                                {type.label}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm
                                    font-medium text-slate-700 mb-1">
                                    Description
                                    <span className="text-slate-400
                                                     font-normal ml-1">
                                        (optional)
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={form.description}
                                    onChange={e => setForm(
                                        prev => ({
                                            ...prev,
                                            description: e.target.value
                                        }))}
                                    placeholder="e.g. Mumbai to Goa flight ticket"
                                    className="w-full border border-slate-200
                                               rounded-xl px-3 py-2 text-sm
                                               focus:outline-none
                                               focus:ring-2
                                               focus:ring-blue-500"
                                />
                            </div>

                            {/* Progress Bar */}
                            {uploading && (
                                <div>
                                    <div className="flex justify-between
                                                    text-xs text-slate-500
                                                    mb-1">
                                        <span>Uploading...</span>
                                        <span>{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100
                                                    rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2
                                                       rounded-full
                                                       transition-all
                                                       duration-300"
                                            style={{
                                                width: `${uploadProgress}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowUpload(false);
                                        setSelectedFile(null);
                                        setPreviewUrl(null);
                                        setError('');
                                    }}
                                    className="flex-1 py-2 border
                                               border-slate-200 rounded-xl
                                               text-sm text-slate-600
                                               hover:bg-slate-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading
                                        || !selectedFile}
                                    className="flex-1 py-2 bg-blue-600
                                               text-white rounded-xl
                                               text-sm font-medium
                                               hover:bg-blue-700 transition
                                               disabled:opacity-50
                                               disabled:cursor-not-allowed
                                               flex items-center
                                               justify-center gap-2"
                                >
                                    {uploading ? (
                                        <>
                                            <span className="w-4 h-4
                                                border-2 border-white/30
                                                border-t-white rounded-full
                                                animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        '📤 Upload'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* ================================================
                    TABS
                ================================================ */}
                <div className="flex gap-2 mb-6 border-b
                                border-slate-200">
                    {['docs', 'photos'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 px-4 text-sm
                                font-medium transition border-b-2
                                ${activeTab === tab
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                        >
                            {tab === 'docs'
                                ? `📂 Documents (${documents
                                    .filter(d =>
                                        d.documentType !== 'PHOTO')
                                    .length})`
                                : `📸 Photos (${photos.length})`}
                        </button>
                    ))}
                </div>

                {/* ================================================
                    DOCUMENTS TAB
                ================================================ */}
                {activeTab === 'docs' && (
                    <>
                        {/* Filter */}
                        <div className="flex gap-2 flex-wrap mb-5">
                            {FILTERS.map(f => (
                                <button
                                    key={f.value}
                                    onClick={() =>
                                        setFilter(f.value)}
                                    className={`px-3 py-1.5
                                        rounded-full text-xs
                                        font-semibold transition
                                        ${filter === f.value
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'}`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        {/* Document List */}
                        {filteredDocs.length === 0 ? (
                            <div className="bg-white border
                                border-slate-200 rounded-2xl
                                p-12 text-center">
                                <div className="text-4xl mb-3">
                                    📂
                                </div>
                                <p className="font-semibold
                                              text-slate-700">
                                    No files yet
                                </p>
                                <p className="text-sm
                                              text-slate-400 mt-1">
                                    Upload flight tickets, bookings,
                                    and travel documents
                                </p>
                                <button
                                    onClick={() =>
                                        setShowUpload(true)}
                                    className="mt-4 bg-blue-600
                                               text-white px-5 py-2
                                               rounded-xl text-sm
                                               hover:bg-blue-700"
                                >
                                    Upload First File
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {filteredDocs.map(doc => (
                                    <div
                                        key={doc.id}
                                        className="bg-white border
                                            border-slate-200
                                            rounded-2xl p-4
                                            hover:border-blue-200
                                            hover:shadow-sm
                                            transition"
                                    >
                                        <div className="flex items-center
                                                        gap-4">

                                            {/* Icon / Thumbnail */}
                                            <div className="w-12 h-12
                                                shrink-0 rounded-xl
                                                overflow-hidden
                                                bg-slate-100 flex
                                                items-center
                                                justify-center">
                                                {isImage(doc.fileType) ? (
                                                    <img
                                                        src={doc.fileUrl}
                                                        alt={doc.fileName}
                                                        className="w-full
                                                                   h-full
                                                                   object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-2xl">
                                                        {getDocTypeInfo(
                                                            doc.documentType)
                                                            .emoji}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1
                                                            min-w-0">
                                                <p className="font-medium
                                                    text-slate-800
                                                    text-sm truncate">
                                                    {doc.originalFileName}
                                                </p>
                                                <div className="flex
                                                    flex-wrap gap-2
                                                    mt-1">
                                                    <span className="text-xs
                                                        bg-blue-50
                                                        text-blue-600
                                                        px-2 py-0.5
                                                        rounded-full">
                                                        {getDocTypeInfo(
                                                            doc.documentType)
                                                            .label}
                                                    </span>
                                                    <span className="text-xs
                                                        text-slate-400">
                                                        {doc.fileSizeFormatted}
                                                    </span>
                                                    <span className="text-xs
                                                        text-slate-400">
                                                        by {doc.uploadedByName}
                                                    </span>
                                                </div>
                                                {doc.description && (
                                                    <p className="text-xs
                                                        text-slate-500
                                                        mt-1 truncate">
                                                        {doc.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex
                                                items-center gap-2
                                                shrink-0">
                                                <a
                                                    href={doc.fileUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="px-3 py-1.5
                                                        border border-blue-200
                                                        text-blue-600 text-xs
                                                        rounded-lg
                                                        hover:bg-blue-50
                                                        transition"
                                                >
                                                    View
                                                </a>
                                                <a
                                                    href={doc.fileUrl}
                                                    download={
                                                        doc.originalFileName}
                                                    className="px-3 py-1.5
                                                        border border-slate-200
                                                        text-slate-600 text-xs
                                                        rounded-lg
                                                        hover:bg-slate-50
                                                        transition"
                                                >
                                                    Download
                                                </a>
                                                {canDelete(doc) && (
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                doc.id)}
                                                        className="px-3 py-1.5
                                                            border border-red-200
                                                            text-red-500 text-xs
                                                            rounded-lg
                                                            hover:bg-red-50
                                                            transition"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* ================================================
                    PHOTOS TAB
                ================================================ */}
                {activeTab === 'photos' && (
                    <>
                        {photos.length === 0 ? (
                            <div className="bg-white border
                                border-slate-200 rounded-2xl
                                p-12 text-center">
                                <div className="text-4xl mb-3">
                                    📸
                                </div>
                                <p className="font-semibold
                                              text-slate-700">
                                    No photos yet
                                </p>
                                <p className="text-sm
                                              text-slate-400 mt-1">
                                    Upload trip photos to create
                                    a gallery
                                </p>
                                <button
                                    onClick={() => {
                                        setForm(prev => ({
                                            ...prev,
                                            documentType: 'PHOTO'
                                        }));
                                        setShowUpload(true);
                                    }}
                                    className="mt-4 bg-blue-600
                                               text-white px-5 py-2
                                               rounded-xl text-sm
                                               hover:bg-blue-700"
                                >
                                    Upload Photos
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-slate-500
                                              mb-4">
                                    {photos.length} photo(s)
                                </p>
                                <div className="grid grid-cols-2
                                                sm:grid-cols-3
                                                lg:grid-cols-4 gap-3">
                                    {photos.map(photo => (
                                        <div
                                            key={photo.id}
                                            className="group relative
                                                bg-slate-100 rounded-2xl
                                                overflow-hidden
                                                aspect-square"
                                        >
                                            <img
                                                src={photo.fileUrl}
                                                alt={photo.originalFileName}
                                                className="w-full h-full
                                                    object-cover
                                                    group-hover:scale-105
                                                    transition duration-300"
                                            />

                                            {/* Hover overlay */}
                                            <div className="absolute inset-0
                                                bg-black/0
                                                group-hover:bg-black/40
                                                transition duration-300
                                                flex items-end">
                                                <div className="w-full p-3
                                                    translate-y-full
                                                    group-hover:translate-y-0
                                                    transition duration-300">
                                                    <p className="text-white
                                                        text-xs truncate
                                                        mb-2">
                                                        {photo.originalFileName}
                                                    </p>
                                                    <div className="flex gap-2">
                                                        <a
                                                            href={photo.fileUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="flex-1
                                                                bg-white/20
                                                                backdrop-blur-sm
                                                                text-white
                                                                text-xs py-1
                                                                rounded-lg
                                                                text-center
                                                                hover:bg-white/30"
                                                        >
                                                            View
                                                        </a>
                                                        {canDelete(photo) && (
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        photo.id)}
                                                                className="flex-1
                                                                    bg-red-500/80
                                                                    text-white
                                                                    text-xs py-1
                                                                    rounded-lg
                                                                    hover:bg-red-600"
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Upload info */}
                                            <div className="absolute top-2
                                                            left-2">
                                                <span className="bg-black/50
                                                    backdrop-blur-sm
                                                    text-white text-[10px]
                                                    px-2 py-0.5 rounded-full">
                                                    {photo.uploadedByName}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Documents;
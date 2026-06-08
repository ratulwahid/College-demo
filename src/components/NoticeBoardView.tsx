import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, Download, Bookmark, FileText, Bell, CheckCircle2 } from 'lucide-react';
import { Notice } from '../types';

interface NoticeBoardViewProps {
  notices: Notice[];
}

export default function NoticeBoardView({ notices }: NoticeBoardViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'academic' | 'admission' | 'administrative' | 'exam'>('All');
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Sorting: Pin notices on top, then descending date
  const sortedNotices = [...notices].sort((a, b) => {
    if (a.isPin && !b.isPin) return -1;
    if (!a.isPin && b.isPin) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Filter notices
  const filteredNotices = sortedNotices.filter((notice) => {
    const matchesSearch = 
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (notice.titleEn && notice.titleEn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categoryTranslate = (cat: string) => {
    switch(cat) {
      case 'academic': return 'একাডেমিক';
      case 'admission': return 'ভর্তি সংক্রান্ত';
      case 'administrative': return 'প্রসাশনিক';
      case 'exam': return 'পরীক্ষা সংক্রান্ত';
      default: return 'সাধারণ';
    }
  };

  const categoryBadgeColor = (cat: string) => {
    switch(cat) {
      case 'academic': return 'bg-emerald-50 text-emerald-800 border-emerald-100';
      case 'admission': return 'bg-amber-50 text-amber-800 border-amber-100';
      case 'administrative': return 'bg-sky-50 text-sky-800 border-sky-100';
      case 'exam': return 'bg-rose-50 text-rose-800 border-rose-100';
      default: return 'bg-slate-50 text-slate-800 border-slate-100';
    }
  };

  const handleDownload = (id: string, name: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`পিডিএফ ডাউনলোড সফল হয়েছে: ${name}.pdf`);
    }, 1200);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Title */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">ডিজিটাল নোটিশ বোর্ড</h1>
        <p className="text-slate-500 text-xs md:text-sm">
          আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজের একাডেমিক, ভর্তি ও দাপ্তরিক নোটিশ ও বিজ্ঞপ্তিসমূহ।
        </p>
      </div>

      {/* Control Panel: Search & Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 shrink-0 flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="নোটিশ খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800 transition-all bg-slate-50"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
          {[
            { id: 'All', label: 'সকল বিজ্ঞপ্তি' },
            { id: 'academic', label: 'একাডেমিক' },
            { id: 'admission', label: 'ভর্তি' },
            { id: 'administrative', label: 'প্রশাসন' },
            { id: 'exam', label: 'পরীক্ষা' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium border transition-all cursor-pointer ${
                selectedCategory === cat.id 
                  ? 'bg-emerald-900 text-white border-emerald-950 shadow-sm' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notice List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredNotices.map((notice) => {
            const isExpanded = expandedNoticeId === notice.id;
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key={notice.id}
                className={`bg-white rounded-xl border transition-all ${
                  notice.isPin 
                    ? 'border-amber-200 shadow-sm bg-gradient-to-r from-amber-50/10 via-white to-white' 
                    : 'border-slate-100 shadow-sm hover:border-slate-200'
                }`}
              >
                {/* Header Container */}
                <div 
                  onClick={() => setExpandedNoticeId(isExpanded ? null : notice.id)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex gap-3 items-start">
                    <div className={`p-2.5 rounded-lg shrink-0 ${
                      notice.isPin ? 'bg-amber-100 text-amber-800' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {notice.isPin ? <Bookmark className="w-5 h-5 fill-amber-600 text-amber-600" /> : <FileText className="w-5 h-5" />}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 border rounded text-[10px] font-semibold ${categoryBadgeColor(notice.category)}`}>
                          {categoryTranslate(notice.category)}
                        </span>
                        {notice.isPin && (
                          <span className="px-2 py-0.5 bg-amber-600 text-white text-[9px] font-bold rounded uppercase tracking-wider flex items-center gap-0.5">
                            <Bell className="w-2.5 h-2.5" /> পিন পোস্ট
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug hover:text-emerald-800 transition-colors">
                        {notice.title}
                      </h3>
                      {notice.titleEn && (
                        <p className="text-[10px] md:text-xs text-slate-400 font-mono italic">{notice.titleEn}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions / Date Panel */}
                  <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <span className="flex items-center gap-1.5 text-slate-500 font-mono text-xs">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{notice.date}</span>
                    </span>
                    <span className="text-xs text-emerald-800 font-semibold underline hover:text-emerald-900">
                      {isExpanded ? 'সংক্ষিপ্ত করুন' : 'বিস্তারিত বিবরণ'}
                    </span>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-slate-50 bg-slate-50/40"
                    >
                      <div className="p-6 space-y-4">
                        <div className="p-4 bg-white border border-slate-100 rounded-lg text-slate-600 text-sm leading-relaxed whitespace-pre-line shadow-inner">
                          {notice.content}
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                          <span className="text-slate-400 text-xs font-mono">আইডি কোড: {notice.id}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(notice.id, notice.title);
                            }}
                            disabled={downloadingId !== null}
                            className={`px-4 py-1.5 text-xs font-semibold rounded-lg bg-emerald-950 text-white hover:bg-emerald-900 border border-emerald-950 transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:bg-slate-300 disabled:border-slate-300 disabled:cursor-not-allowed`}
                          >
                            {downloadingId === notice.id ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                                <span>ডাউনলোড হচ্ছে...</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>পিডিএফ রসিদ ডাউনলোড</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredNotices.length === 0 && (
          <div className="py-12 text-center bg-white border border-dashed border-slate-200 rounded-2xl">
            <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <h4 className="font-bold text-slate-700 text-base">কোনো নোটিশ খুঁজে পাওয়া যায়নি</h4>
            <p className="text-xs text-slate-500 mt-1">অনুগ্রহ করে ভিন্ন কোনো কীওয়ার্ড দিয়ে নোটিশ অনুসন্ধান করুন।</p>
          </div>
        )}
      </div>
    </div>
  );
}

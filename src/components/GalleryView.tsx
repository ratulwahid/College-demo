import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Clock, ZoomIn, X, Download, Tag } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryViewProps {
  gallery: GalleryItem[];
}

export default function GalleryView({ gallery }: GalleryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'campus' | 'sports' | 'cultural' | 'events'>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Filter items
  const filteredGallery = gallery.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  const categoryTranslate = (cat: string) => {
    switch (cat) {
      case 'campus': return 'ক্যাম্পাস প্রাঙ্গণ';
      case 'sports': return 'ক্রীড়া ও খেলাধুলা';
      case 'cultural': return 'সাংস্কৃতিক অনুষ্ঠান';
      case 'events': return 'সেমিনার ও উৎসব';
      default: return 'অন্যান্য';
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">ফটোগ্রাফি ও ক্যাম্পাস গ্যালারি</h1>
        <p className="text-slate-500 text-xs md:text-sm">
          মনোরম পাহাড়ি পটভূমিতে ঘেরা আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজের বর্ণিল জীবনযাত্রার টুকরো টুকরো স্মৃতিমালা।
        </p>
      </div>

      {/* Categories header filter */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-wrap gap-1.5 justify-center md:justify-start items-center">
        {[
          { id: 'All', label: 'সকল ফটো স্মৃতি' },
          { id: 'campus', label: 'ক্যাম্পাস ও পরিবেশ' },
          { id: 'sports', label: 'ক্রীড়া প্রতিযোগিতা' },
          { id: 'cultural', label: 'সাংস্কৃতিক প্রান্তর' },
          { id: 'events', label: 'অনুষ্ঠান ও উৎসব' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setSelectedCategory(btn.id as any)}
            className={`px-3.5 py-1.5 text-xs rounded-lg font-medium border transition-all cursor-pointer ${
              selectedCategory === btn.id 
                ? 'bg-emerald-900 text-white border-emerald-950 shadow-sm' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredGallery.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, delay: idx * 0.03 }}
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-900">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating overlay indicators */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white ring-4 ring-white/10">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>

                <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/50 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-wider rounded-md">
                  {categoryTranslate(item.category)}
                </span>
              </div>

              {/* Title summary */}
              <div className="p-4.5 space-y-2 select-none">
                <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-emerald-900 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.date}</span>
                  </span>
                  <span>ID: {item.id}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ZOOM LIGHTBOX */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 bg-black/95 z-55 flex flex-col justify-center items-center p-4"
          >
            {/* Control close button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden max-w-4xl w-full flex flex-col"
            >
              <div className="aspect-[16/10] md:aspect-[16/9] bg-black">
                <img 
                  src={lightboxItem.image} 
                  alt={lightboxItem.title} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Lightbox descriptor */}
              <div className="p-6 bg-zinc-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-500 font-semibold text-xs">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{categoryTranslate(lightboxItem.category)}</span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-white">{lightboxItem.title}</h3>
                  <p className="text-xs text-zinc-400 font-mono">প্রকাশিত তারিখ ও সময়: {lightboxItem.date}</p>
                </div>

                <a
                  href={lightboxItem.image}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-900 text-white hover:bg-emerald-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md select-none border border-emerald-950 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>মূল ছবি ডাউনলোড</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { motion } from 'motion/react';
import { Award, BookOpen, Clock, Heart, Landmark, MapPin, Shield, Star, Users } from 'lucide-react';

export default function AboutCollege() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-16 py-6"
    >
      {/* 1. Founder Tribute Section & Hero Banner */}
      <motion.section variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_70%)]" />
          <Landmark className="mx-auto text-amber-500 w-12 h-12 mb-4 animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-amber-400">স্মরণীয় ব্যক্তিত্ব ও প্রতিষ্ঠাতা শ্রদ্ধাঞ্জলি</h1>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto font-light text-sm md:text-base">
            সত্য, সাধুতা ও সুশাসনের আলোকবর্তিকা—আলহাজ্ব শরিফউদ্দিন সরকার মহোদয়ের অসামান্য অবদানের সংক্ষিপ্ত বিবরণী।
          </p>
        </div>

        <div className="p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative p-2 bg-gradient-to-tr from-amber-500 to-emerald-800 rounded-2xl shadow-lg group">
              <img 
                src="https://75bangladesh.com/wp-content/uploads/2025/03/IMG_20250308_004926_600_x_315_pixel.jpg" 
                alt="Alhaj Sharif Uddin Sarkar" 
                className="rounded-xl w-full max-w-xs object-cover aspect-[4/3] md:aspect-[5/4] shadow-inner"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs text-center font-medium">শ্রদ্ধেয় আলহাজ্ব শরিফউদ্দিন সরকার মহোদয়</span>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-slate-500 leading-relaxed font-semibold max-w-xs italic text-primary">
              "এই কলেজটি প্রতিষ্ঠিত হয়েছে সমাজসেবক, সৎ ও নিবেদিতপ্রাণ ব্যক্তিত্ব আলহাজ্ব শরিফউদ্দিন সরকারের স্মৃতির প্রতি শ্রদ্ধা জানিয়ে।"
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-amber-600 font-semibold text-lg">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <span>মহৎ সমাজ সংস্কারকের প্রতি নিবেদন</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">আলহাজ্ব শরিফউদ্দিন সরকার (১৯৪৮ - ২০২৪)</h2>
            <p className="text-slate-500 text-xs uppercase tracking-wider font-mono">সমাজসেবক, সংগঠক ও সাবেক রাজনৈতিক ব্যক্তিত্ব | ঝিনাইগাতী, শেরপুর</p>
            
            <p className="text-slate-600 leading-relaxed text-sm">
              শেরপুরের ঝিনাইগাতী অঞ্চলের আপামর সধারণের অতি পরিচিত ও বিশ্বস্ত নাম ছিল মরহুম <strong>আলহাজ্ব শরিফউদ্দিন সরকার</strong>। তিনি শুধু একজন ধার্মিক ও পরোপকারী ব্যক্তিই ছিলেন না, বরং ছিলেন এলাকার যাবতীয় সামাজিক উন্নয়নমূলক কর্মকাণ্ডের মূল চালিকাশক্তি। তাঁর সততা, নেতৃত্ব, জনকল্যাণমুখী মানসিকতা এবং অসামান্য প্রশাসনিক গুণাবলীর জন্য তিনি সর্বমহলে শ্রদ্ধার পাত্র হয়ে আছেন।
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              তিনি বিশ্বাস করতেন, শিক্ষা ব্যতীত কোনো জাতির প্রকৃত মুক্তি এবং টেকসই উন্নয়ন সম্ভব নয়। ঝিনাইগাতী ও সংলগ্ন পাহাড়ি এবং অবহেলিত অঞ্চলের দরিদ্র জনগোষ্ঠীর সন্তানদের জন্য একটি উচ্চমানের উচ্চশিক্ষা প্রতিষ্ঠান গড়ে তোলা ছিল তাঁর আজীবনের লালিত স্বপ্ন। তাঁর সেই স্বপ্ন ও আদর্শকে চিরকাল উজ্জ্বল রাখতে এবং পরবর্তী প্রজন্মের কাছে সততা ও সমাজসেবার দৃষ্টান্ত পৌছে দিতেই পরিবারের সদস্যরা ও স্থানীয় সুধীসমাজ এই মহতি বিদ্যাপীঠটি প্রতিষ্ঠা করেন।
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 items-start p-3 bg-emerald-50/50 rounded-lg">
                <Shield className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-emerald-900 text-sm">মূল নীতি ও সততা</h4>
                  <p className="text-xs text-slate-600">রাজনীতি ও সমাজ পরিচালনায় লোভহীন ও সৎ জীবনাদর্শ স্থাপন।</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 bg-amber-50/50 rounded-lg">
                <Heart className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 text-sm">জনকল্যাণে উৎসর্গীকৃত</h4>
                  <p className="text-xs text-slate-600">পারিবারিক নিজস্ব জমি ও সাহায্য দান করে শিক্ষার পথ সুগম করা।</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. College History & Locational Pride */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.section variants={itemVariants} className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-900 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">কলেজের ইতিহাস ও পটভূমি</h3>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm">
            আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজটি বাংলাদেশের উত্তর সীমান্তে ভারতীয় মেঘালয় পাহাড়ের কোল ঘেঁষে অবস্থিত শেরপুর জেলার অন্যতম অবহেলিত উপজেলা <strong>ঝিনাইগাতী</strong> সদরে অবস্থিত। ঝিনাইগাতীর সুধীসমাজ ও বিদ্যোৎসাহি মানুষের আন্তরিক প্রচেষ্টায় এবং মরহুমের পরিবারের সর্বাত্মক পৃষ্ঠপোষকতায় কলেজটির পথচলা শুরু হয়।
          </p>
          <p className="text-slate-600 leading-relaxed text-sm">
            প্রতিষ্ঠালগ্ন থেকেই এটি পুরো শেরপুর জেলা তথা ময়মনসিংহ বিভাগের একটি গতিশীল এবং আধুনিক মডেল কলেজ হিসেবে নিজেকে প্রতিষ্ঠিত করার উদ্দেশ্যে নিরলস কাজ করে যাচ্ছে। কলেজটিতে দক্ষ শিক্ষক মণ্ডলী দ্বারা নিয়মিত পাঠদান, সৃজনশীল কর্মশালা ও সহশিক্ষা কার্যক্রম সুনিশ্চিত করা হয়। এর ফলে অল্প সময়ের মধ্যেই এটি স্থানীয় সীমানা ছাড়িয়ে বৃহত্তর শেরপুরে সুনাম ছড়িয়ে দিতে সমর্থ হয়েছে।
          </p>
          <div className="flex items-center gap-2 text-slate-500 font-mono text-xs bg-slate-50 p-3 rounded-lg">
            <MapPin className="w-4 h-4 text-emerald-800" />
            <span>অবস্থান: ঝিনাইগাতী, শেরপুর সড়ক, জিপিও ৪১৩০, শেরপুর, বাংলাদেশ।</span>
          </div>
        </motion.section>

        {/* Vision & Mission */}
        <motion.section variants={itemVariants} className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-6 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Star className="w-5 h-5" />
              <h3 className="text-lg font-bold">আমাদের ভিশন (Vision)</h3>
            </div>
            <p className="text-slate-200 text-xs leading-relaxed">
              একটি নৈতিক, বিজ্ঞানমনস্ক ও স্বাবলম্বী প্রজন্ম বিনির্মাণ করা যারা সুশিক্ষায় আলোকিত হয়ে সততার সাথে ঝিনাইগাতী ও মাতৃভূমি বাংলাদেশের অগ্রগতিতে আত্মনিয়োগ করতে সদা সচেষ্ট থাকবে।
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800">
              <Award className="w-5 h-5" />
              <h3 className="text-lg font-bold">আমাদের মিশন (Mission)</h3>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
              <li>শিক্ষার্থীদের মুখস্থ বিদ্যার বাইরে বাস্তবিক ও ব্যবহারিক জ্ঞানে সমৃদ্ধ করা।</li>
              <li>সৎ চরিত্র গঠনের পাশাপাশি কম্পিউটার ও তথ্য প্রযুক্তিতে বাস্তব পারদর্শিতা গড়ে তোলা।</li>
              <li>দরিদ্র ও সুবিধাবঞ্চিত পাহাড়ি নৃ-তাত্ত্বিক জনপদের মেধাবী শিক্ষার্থীদের বিনামূল্যে বা নামমাত্র মূল্যে উচ্চশিক্ষার সুযোগ নিশ্চিত করা।</li>
            </ul>
          </div>
        </motion.section>
      </div>

      {/* 3. Acting Principal Message */}
      <motion.section variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 bg-emerald-50 p-8 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r border-slate-100">
            <img 
              src="https://lh3.googleusercontent.com/d/13oActHtvjX-qpcvPwoBfUQbhftS10vFp" 
              alt="Principal Srabon Wahid Ratul" 
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md grayscale hover:grayscale-0 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            <h4 className="mt-4 font-bold text-slate-900 text-lg">শ্রাবণ ওয়াহিদ রাতুল</h4>
            <p className="text-xs text-emerald-800 font-semibold">অধ্যক্ষ (ভারপ্রাপ্ত)</p>
            <p className="text-slate-500 font-mono text-[10px] mt-1">এম.এসসি (রসায়ন), ১ম শ্রেণী</p>
            <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">
              <Clock className="w-3.5 h-3.5" />
              কার্যালয় সময়: ৯:০০ AM - ৪:০০ PM
            </span>
          </div>

          <div className="lg:col-span-8 p-6 md:p-8 lg:p-10 space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">অধ্যক্ষের বাণী ও স্বাগত বার্তা</h3>
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "বিসমিল্লাহির রহমানির রাহিম। আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজের পক্ষ থেকে আপনাদের সবাইকে আন্তরিক শুভেচ্ছা ও অভিনন্দন। আমাদের কলেজটি শুধুমাত্র শেরপুরের ঝিনাইগাতীর একটি সাধারণ কলেজ নয়, বরং এটি সমাজসেবক মরহুম আলহাজ্ব শরিফউদ্দিন সরকার মহোদয়ের আজীবনের লালিত নীতির প্রতীক।"
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              আমরা শিক্ষাকে কেবল জীবিকা অর্জনের মাধ্যম হিসেবে দেখি না, বরং এটিকে আমরা একজন শিক্ষার্থীর সামগ্রিক শারীরিক, মানসিক ও নৈতিক পূর্ণতা অর্জনের চালিকাশক্তি হিসেবে বিবেচনা করি। সেজন্য আমরা সহশিক্ষা কার্যক্রম, কম্পিউটার ও বিজ্ঞান ল্যাব সুনিশ্চিত করার পাশাপাশি শিক্ষার্থীদের সৎ হিসেবে গড়ে তুলতে সর্বদা উদ্বুদ্ধ করি।
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              অভিভাবকদের প্রতি আমার বার্তা থাকবে, আপনাদের সন্তানকে একটি আদর্শিক ও পরিচ্ছন্ন মননশীল বিদ্যাপীঠে পাঠানোর যে আকাঙ্ক্ষা, তা পূরণে আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজ অঙ্গিকারাবদ্ধ। আমি আমাদের কলেজ গভর্নিং বডি, স্থানীয় প্রশাসন এবং সম্মানিত সুধী সমাজের নিরবচ্ছিন্ন সমর্থন ও সহায়তার জন্য আন্তরিক কৃতজ্ঞতা জানাচ্ছি।
            </p>
            <div className="pt-2">
              <p className="text-xs text-slate-400">শুভেচ্ছান্তে,</p>
              <h5 className="font-bold text-emerald-950 text-sm mt-1">ভারপ্রাপ্ত অধ্যক্ষ: শ্রাবণ ওয়াহিদ রাতুল।</h5>
              <p className="text-xs text-slate-500">আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজ, ঝিনাইগাতী</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. Infrastructure & Academic Environment */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">আমাদের সুযোগ-সুবিধা ও মনোরম অবকাঠামো</h3>
          <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto">
            সুপরিচ্ছন্ন ও মনোরম শিক্ষার পরিবেশ নিশ্চিত করতে আমরা আধুনিক অবকাঠামোগত সুযোগ-সুবিধা বৃদ্ধি করে চলেছি।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80" 
              alt="Digital Computer Lab" 
              className="w-full h-48 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-5 space-y-2">
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] uppercase font-mono tracking-wider rounded-md font-semibold">ডিজিটাল ল্যাব</span>
              <h4 className="font-bold text-slate-900 text-base">মাল্টিমিডিয়া কম্পিউটার ল্যাব</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                উন্নত কনফিগারেশনের ২৫টিরও বেশি কম্পিউটার এবং দ্রুতগতির ইন্টারনেট সংযোগ সমৃদ্ধ আধুনিক ল্যাব, যা সকল দ্বাদশ ও একাদশ স্তরের আইসিটি ক্লাসের ব্যবহারিক শিক্ষা নিশ্চিত করে।
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <img 
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=500&q=80" 
              alt="Sherpur College Library" 
              className="w-full h-48 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-5 space-y-2">
              <span className="px-2 py-0.5 bg-amber-55 bg-amber-50 text-amber-800 text-[10px] uppercase font-mono tracking-wider rounded-md font-semibold">স্মার্ট লাইব্রেরি</span>
              <h4 className="font-bold text-slate-900 text-base">ঋদ্ধ পাঠাগার ও গবেষণা কেন্দ্র</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                পড়ালেখার সহায়ক হাজারোর্ধ একাডেমিক বই, ম্যাগাজিন, উপন্যাস এবং দৈনিক পত্রিকার সুবিশাল সমাহার, যেখানে শিক্ষার্থীরা শান্ত ও সুশৃঙ্খল পরিবেশে পড়ালেখা করতে পারে।
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80" 
              alt="Sherpur Sports Playground" 
              className="w-full h-48 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-5 space-y-2">
              <span className="px-2 py-0.5 bg-sky-50 text-sky-800 text-[10px] uppercase font-mono tracking-wider rounded-md font-semibold">ক্রীড়া ও প্রান্তর</span>
              <h4 className="font-bold text-slate-900 text-base">বিশাল খেলার মাঠ ও প্রান্তর</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                শিক্ষার্থীদের শারীরিক বিকাশের জন্য সুপ্রশস্ত মাঠে ফুটবল, ক্রিকেট ও ভলিবল সহ বার্ষিক ক্রীড়া ইভেন্ট আয়োজিত হয়। রয়েছে আকর্ষণীয় উদ্যান।
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. College Achievements */}
      <motion.section variants={itemVariants} className="bg-emerald-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(217,119,6,0.15),transparent_60%)]" />
        <div className="relative text-center max-w-2xl mx-auto space-y-4 mb-10">
          <Award className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-2xl md:text-3xl font-bold text-amber-400">আমাদের উল্লেখযোগ্য অর্জনসমূহ</h3>
          <p className="text-xs md:text-sm text-slate-300">
            ঝিনাইগাতীর আলোর দিশারী হয়ে আমরা শিক্ষাগত ও সামাজিক ক্ষেত্রে ঈর্ষণীয় সাফল্য অর্জন করেছি।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-emerald-900/40 rounded-2xl border border-emerald-800/60 flex flex-col items-center text-center space-y-2">
            <Users className="w-8 h-8 text-amber-400" />
            <h4 className="font-bold text-base text-white">উপজেলা পর্যায় গৌরব</h4>
            <p className="text-xs text-slate-300">
              ঝিনাইগাতী উপজেলায় বিগত তিন বছর ধরে এইচএসসি (HSC) পরীক্ষায় সর্বোচ্চ পাসের হার অর্জন।
            </p>
          </div>

          <div className="p-6 bg-emerald-900/40 rounded-2xl border border-emerald-800/60 flex flex-col items-center text-center space-y-2">
            <Award className="w-8 h-8 text-amber-400" />
            <h4 className="font-bold text-base text-white">সেরা স্কাউট দল পুরস্কার</h4>
            <p className="text-xs text-slate-300">
              শেরপুর জেলা ক্রীড়া ও স্কাউটিং প্রতিযোগিতায় শ্রেষ্ঠ সমাজসেবা পদক অর্জন।
            </p>
          </div>

          <div className="p-6 bg-emerald-900/40 rounded-2xl border border-emerald-800/60 flex flex-col items-center text-center space-y-2">
            <BookOpen className="w-8 h-8 text-amber-400" />
            <h4 className="font-bold text-base text-white">১০০% ব্যবহারিক শিক্ষা</h4>
            <p className="text-xs text-slate-300">
              বিজ্ঞান বিভাগে প্রত্যেক শিক্ষার্থীর হাতে কলমে ল্যাব এক্সপেরিমেন্ট নিশ্চিতকরণ।
            </p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

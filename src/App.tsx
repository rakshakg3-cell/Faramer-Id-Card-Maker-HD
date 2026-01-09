
import React, { useState, useEffect, useRef } from 'react';
import { FarmerData, PaymentStatus, LandRecord } from '../types';
import IDCardForm from './IDCardForm';
import IDCardPreview from './IDCardPreview';
import PaymentGateway from './PaymentGateway';
import { generatePDF } from '../utils/pdfGenerator';
import { Download, CreditCard, Layout, CheckCircle, Loader2, RefreshCw, Eye, Lock } from 'lucide-react';

const INITIAL_DATA: FarmerData = {
  fullNameEnglish: '',
  fullNameMarathi: '',
  dob: '',
  gender: 'Male',
  whatsapp: '',
  aadhaar: '',
  farmerId: '',
  address: '',
  photo: null,
  landRecords: [{ district: '', taluka: '', village: '', surveyNumber: '' }],
};

const SAMPLE_DATA: FarmerData = {
  fullNameEnglish: 'RAHUL KUMAR PATIL',
  fullNameMarathi: 'राहुल कुमार पाटील',
  dob: '1985-05-15',
  gender: 'Male',
  whatsapp: '9876543210',
  aadhaar: '1234 5678 9012',
  farmerId: '3009128347',
  address: 'At Post Kondhve, Tal. Haveli, Dist. Pune - 411048',
  photo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200',
  landRecords: [{ district: 'Pune', taluka: 'Haveli', village: 'Kondhve', surveyNumber: '42/1' }],
};

const App: React.FC = () => {
  const [farmerData, setFarmerData] = useState<FarmerData>(INITIAL_DATA);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(PaymentStatus.IDLE);
  const [showPayment, setShowPayment] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateNewId();
  }, []);

  const generateNewId = () => {
    const randomId = '300' + Math.floor(Math.random() * 9000000 + 1000000);
    setFarmerData(prev => ({ ...prev, farmerId: randomId }));
  };

  const handleDataChange = (newData: Partial<FarmerData>) => {
    setFarmerData(prev => ({ ...prev, ...newData }));
  };

  const handleReset = () => {
    if (confirm("काय तुम्ही नवीन फॉर्म भरू इच्छिता? (Do you want to clear and start new?)")) {
      setFarmerData(INITIAL_DATA);
      setPaymentStatus(PaymentStatus.IDLE);
      generateNewId();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInitiatePayment = () => {
    if (!farmerData.fullNameEnglish || !farmerData.aadhaar || !farmerData.whatsapp || !farmerData.photo) {
      alert("कृपया सर्व माहिती भरा आणि फोटो अपलोड करा (Please fill all fields and upload photo).");
      return;
    }
    setShowPayment(true);
  };

  const startDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      await generatePDF(cardRef.current, farmerData.fullNameEnglish);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePaymentComplete = async () => {
    setPaymentStatus(PaymentStatus.SUCCESS);
    setShowPayment(false);
    // Short delay to ensure modal is closed before snapshotting
    setTimeout(startDownload, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-emerald-700 text-white p-4 shadow-lg sticky top-0 z-[60]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-full">
              <svg className="w-6 h-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-xl leading-tight text-white">Agro Stack</h1>
              <p className="text-[10px] opacity-90 uppercase tracking-wider font-bold">शेतकरी डिजिटल ओळख</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleReset}
              className="bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500 flex items-center gap-1 transition-all"
            >
              <RefreshCw className="w-3 h-3" /> नवीन बनवा
            </button>
            <span className="hidden md:block bg-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-600">
              अशासकीय आयडी जनरेटर
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full p-4 md:p-8 space-y-12">
        
        {/* NEW: Demo Card Section */}
        <section className="bg-emerald-50/50 border-2 border-emerald-100 rounded-3xl p-6 md:p-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4">
             <span className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase">
               <Eye className="w-3 h-3" /> Digital Demo
             </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-emerald-900 leading-tight">
                तुमचा आयडी असा दिसेल <br/> 
                <span className="text-emerald-600">(Your Card Sample)</span>
              </h2>
              <p className="text-emerald-800/70 font-medium">
                आधुनिक 'अग्रो स्टॅक' थीमसह, अल्ट्रा एचडी प्रिंटिंगसाठी तयार केलेले शेतकरी ओळखपत्र. 
                हे कार्ड पीव्हीसी प्लास्टिक कार्डवर प्रिंट करण्यासाठी सर्वोत्तम आहे.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="bg-white px-4 py-2 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-gray-700">Ultra HD PDF</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-gray-700">QR Verified</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-gray-700">PVC Print Ready</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="scale-[0.55] sm:scale-[0.7] lg:scale-[0.85] origin-center pointer-events-none opacity-90 transition-all hover:opacity-100">
                <IDCardPreview data={SAMPLE_DATA} />
              </div>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mt-4">Professional Standard Template</p>
            </div>
          </div>
        </section>

        {/* Form and Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Layout className="w-5 h-5 text-emerald-600" />
                  शेतकरी तपशील (Farmer Details)
                </h2>
                <button onClick={handleReset} className="text-gray-400 hover:text-red-500 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <IDCardForm data={farmerData} onChange={handleDataChange} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 uppercase text-sm tracking-wide">Card Issuance Fee</h3>
                <span className="text-2xl font-black text-emerald-700">₹20.00</span>
              </div>
              <p className="text-xs text-gray-500 mb-6 font-medium">
                Fees cover Ultra-HD PDF generation and automated system validation.
              </p>
              
              {paymentStatus !== PaymentStatus.SUCCESS ? (
                <button
                  onClick={handleInitiatePayment}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-tight"
                >
                  <CreditCard className="w-6 h-6" />
                  Pay ₹20 & Get UHD Card
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="w-full bg-emerald-50 border-2 border-emerald-200 text-emerald-800 font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Payment Successful!
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button 
                      onClick={startDownload}
                      disabled={isGenerating}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          Download PDF
                        </>
                      )}
                    </button>
                    <button 
                      onClick={handleReset}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-black py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Create Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 space-y-6 h-fit">
            <div className="flex justify-between items-center">
               <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                 Live Card Preview
               </h2>
               {paymentStatus === PaymentStatus.SUCCESS && !isGenerating && (
                  <button onClick={startDownload} className="text-emerald-700 flex items-center gap-1 text-sm font-black bg-emerald-50 px-3 py-1 rounded-full border-2 border-emerald-200 animate-pulse">
                     <Download className="w-3 h-3" /> Save UHD PDF
                  </button>
               )}
            </div>
            
            <div className="flex flex-col gap-6 items-center">
              {/* UPDATED: Wrapper for blur effect */}
              <div className="relative group overflow-hidden rounded-2xl">
                <div className={`transition-all duration-700 ${paymentStatus !== PaymentStatus.SUCCESS ? 'blur-[8px] grayscale-[0.3] scale-[0.98]' : 'blur-0 grayscale-0 scale-100'}`}>
                  <div className="scale-[0.6] sm:scale-75 md:scale-100 origin-top">
                    <IDCardPreview ref={cardRef} data={farmerData} />
                  </div>
                </div>

                {/* Lock Overlay for blurred preview */}
                {paymentStatus !== PaymentStatus.SUCCESS && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 flex flex-col items-center gap-3 animate-in fade-in zoom-in-90 duration-500">
                      <div className="bg-emerald-100 p-3 rounded-full">
                        <Lock className="w-8 h-8 text-emerald-700" />
                      </div>
                      <p className="text-lg font-black text-gray-800 uppercase tracking-tight">Preview Locked</p>
                      <p className="text-xs text-center text-gray-500 font-medium max-w-[180px]">
                        Pay ₹20 to unlock high-definition preview and download.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center max-w-sm shadow-sm">
                 <p className="text-[11px] text-amber-800 font-black uppercase mb-1">Printing Instructions</p>
                 <p className="text-[10px] text-amber-700 leading-tight font-medium">
                   This is an <strong>Ultra High Definition (UHD)</strong> file. For professional results, print on a <strong>PVC ID card</strong> at 300DPI or higher. Fits standard wallet pouches (85.6mm x 54mm).
                 </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 p-8 mt-12">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 opacity-50 grayscale">
            <svg className="w-8 h-8 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="font-bold text-xl">Agro Stack</span>
          </div>
          <p className="text-gray-400 text-xs font-medium max-w-md uppercase tracking-widest">
            अशासकीय डिजिटल ओळख प्रणाली. अधिकृत कागदपत्रांसाठी शासकीय कार्यालयांशी संपर्क साधावा.
          </p>
          <p className="text-gray-300 text-[10px]">© 2024 Agro Stack Unofficial Tool. Built with precision.</p>
        </div>
      </footer>

      {/* Payment Gateway Modal */}
      {showPayment && (
        <PaymentGateway 
          onSuccess={handlePaymentComplete} 
          onCancel={() => setShowPayment(false)} 
        />
      )}
    </div>
  );
};

export default App;

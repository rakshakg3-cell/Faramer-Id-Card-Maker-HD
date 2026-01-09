
import React, { forwardRef } from 'react';
import { FarmerData } from '../types';
import { QRCodeSVG } from 'qrcode.react';

interface Props {
  data: FarmerData;
}

/**
 * ID Card Standard Size 85.6mm x 53.98mm
 * Target Resolution: 648px x 408px
 * Optimized for high-definition PVC printing with a realistic wheat field landscape.
 */
const IDCardPreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const wheatBgUrl = "https://images.unsplash.com/photo-1474135525142-81b162ca3d79?auto=format&fit=crop&q=80&w=1000";

  return (
    <div ref={ref} className="flex flex-col gap-12 items-center p-10 bg-gray-200">
      {/* Front Side (Upar Ka Card) */}
      <div 
        id="id-card-front"
        className="relative bg-white overflow-hidden flex flex-col shadow-2xl"
        style={{ 
          width: '648px', 
          height: '408px', 
          minWidth: '648px', 
          minHeight: '408px', 
          borderRadius: '16px',
          border: '1.5px solid #064e3b',
          boxSizing: 'border-box'
        }}
      >
        {/* REALISTIC HD BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <img 
            src={wheatBgUrl} 
            alt="Wheat Field" 
            className="w-full h-full object-cover brightness-[1.05] contrast-[1.05]"
          />
          {/* Subtle Color Overlay to ensure text pops */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-emerald-950/40"></div>
        </div>

        {/* WATERMARK OVERLAYS (Tractor, Birds, Bail) */}
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none z-10">
          <svg width="100%" height="100%" viewBox="0 0 648 408" xmlns="http://www.w3.org/2000/svg">
            {/* Flying Birds */}
            <g transform="translate(150, 90)" fill="none" stroke="#ffffff" strokeWidth="2">
              <path d="M0 0c2-2 4-2 6 0c2-2 4-2 6 0" />
              <path d="M30 -15c2-2 4-2 6 0c2-2 4-2 6 0" transform="scale(0.8)" />
            </g>
            {/* Tractor Silhouette */}
            <g transform="translate(520, 310) scale(0.6)" fill="#ffffff">
              <path d="M10 40 L 90 40 L 90 30 L 70 30 L 70 10 L 30 10 L 30 30 L 10 30 Z" />
              <circle cx="25" cy="45" r="12" />
              <circle cx="75" cy="45" r="15" />
            </g>
            {/* Bull Silhouette */}
            <g transform="translate(40, 330) scale(0.4)" fill="#ffffff">
              <path d="M20 40 Q 15 30 10 35 L 5 50 L 10 70 L 30 70 L 30 90 L 45 90 L 45 70 L 70 70 L 70 90 L 85 90 L 85 70 L 100 70 Q 110 40 90 30 Q 80 20 60 30 Z" />
            </g>
          </svg>
        </div>

        {/* LAMINATION SHINE EFFECT */}
        <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.15]" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
          backgroundSize: '200% 200%',
        }}></div>

        {/* Header Section */}
        <div className="h-[74px] bg-emerald-800/95 backdrop-blur-sm flex items-center px-5 shrink-0 relative shadow-sm z-50 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-full shadow-lg">
               <svg className="w-10 h-10 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div className="text-white">
              <h1 className="font-black text-[24px] leading-none tracking-tight drop-shadow-md">Agro Stack</h1>
              <p className="text-[10px] font-black uppercase mt-2.5 tracking-tighter opacity-100">Verified Digital Identity For Every Farmer</p>
            </div>
          </div>
          
          <div className="ml-auto bg-emerald-900/80 border-2 border-white/40 px-3 py-1.5 rounded-lg flex flex-row items-center gap-2 -mt-7 shadow-xl">
            <span className="text-white text-[9px] font-black uppercase leading-none tracking-tighter">FARMER ID</span>
            <div className="w-[2px] h-4 bg-white/40 mx-0.5"></div>
            <span className="text-white font-black text-[13px] tracking-widest leading-none font-mono">
              {data.farmerId}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow p-4 pt-4 flex gap-5 bg-transparent relative overflow-hidden z-20">
          {/* Photo & Badge Area */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="w-[90px] h-[110px] border-[3px] border-emerald-900 bg-white/90 flex items-center justify-center overflow-hidden rounded-md shadow-2xl">
              {data.photo ? (
                <img src={data.photo} alt="Farmer" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400 text-[8px] font-black text-center px-2 uppercase">Photo</div>
              )}
            </div>
            {/* VERIFIED BADGE - MOVED SLIGHTLY LOWER AS REQUESTED (-mt-1.5 instead of -mt-3.5) */}
            <div className="-mt-1.5 bg-emerald-900 px-2 py-0.5 rounded shadow-xl border border-emerald-700 z-30">
               <span className="text-[8px] font-black text-white uppercase tracking-tighter">Verified</span>
            </div>
          </div>

          {/* Info Area with Glassmorphism for legibility */}
          <div className="flex-grow flex flex-col pt-0 bg-white/60 backdrop-blur-[2px] p-3 rounded-xl border border-white/40 shadow-sm">
             <div className="border-b-[2px] border-emerald-800/20 pb-2 mb-2">
                <p className="text-[10px] text-emerald-900 font-black uppercase leading-none mb-1.5">NAME / नाव</p>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[18px] font-black text-black leading-tight uppercase tracking-tight">
                    {data.fullNameEnglish || 'RAHUL KUMAR PATIL'}
                  </p>
                  <p className="text-[20px] font-black text-black leading-tight">
                    {data.fullNameMarathi || 'राहुल कुमार पाटील'} 
                  </p>
                </div>
             </div>

             <div className="border-b-[2px] border-emerald-800/20 pb-1.5 mb-2">
                <p className="text-[10px] text-emerald-900 font-black uppercase leading-none mb-1">RESIDENCE / पत्ता</p>
                <p className="text-[13px] font-black text-black leading-[1.3] h-[36px] overflow-hidden uppercase">
                  {data.address || 'Address Village, Taluka, District...'}
                </p>
             </div>

             <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-[10px] text-emerald-900 font-black uppercase leading-none mb-1">MOBILE</p>
                  <p className="text-[16px] font-black text-black tracking-tight">{data.whatsapp || '9876543210'}</p>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-emerald-900 font-black uppercase leading-none mb-1">AADHAR</p>
                  <p className="text-[16px] font-black text-black tracking-tighter">{data.aadhaar || '1234 5678 9012'}</p>
                </div>
             </div>
          </div>

          {/* QR Area */}
          <div className="shrink-0 flex flex-col items-center justify-start mt-1 gap-0">
            <div className="p-2 bg-white/90 border-[3px] border-emerald-900 rounded-xl shadow-2xl backdrop-blur-sm">
              <QRCodeSVG value={`FARMER:${data.farmerId}|AADHAR:${data.aadhaar}`} size={78} level="H" />
            </div>
            {/* SCAN VERIFY BADGE HIGHER (-mt-2.5) */}
            <p className="text-[9px] text-emerald-950 font-black uppercase tracking-tighter bg-emerald-50/90 px-2 rounded-sm border border-emerald-200 -mt-2.5 shadow-lg z-30">Scan Verify</p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-auto flex flex-col shrink-0 z-50">
          <div className="bg-emerald-50/95 backdrop-blur-sm border-t-[3px] border-b-[3px] border-emerald-800 py-1 flex justify-center items-center gap-5">
             <span className="text-[12px] font-black text-emerald-950 uppercase tracking-[0.2em]">FARMER ID:</span>
             <span className="text-[26px] font-black text-black font-mono tracking-[0.2em] leading-none drop-shadow-sm -mt-2.5 pb-1">{data.farmerId}</span>
          </div>
          <div className="bg-emerald-800 h-[30px] flex items-center justify-between px-5 text-white shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
            <span className="text-[12px] font-black uppercase tracking-wide">शेतकरी आयडी - बळीराजाचा स्वाभिमान</span>
            {/* UNOFFICIAL BADGE HIGHER (-mt-8) */}
            <span className="text-[9px] font-black uppercase bg-emerald-900 border border-white/40 px-3 py-0.5 rounded-full -mt-8 shadow-2xl ring-2 ring-emerald-700/50 z-50">Unofficial ID</span>
          </div>
        </div>
      </div>

      {/* Back Side (Niche ka Card) */}
      <div 
        id="id-card-back"
        className="relative bg-white overflow-hidden flex flex-col shadow-2xl"
        style={{ 
          width: '648px', 
          height: '408px', 
          minWidth: '648px', 
          minHeight: '408px', 
          borderRadius: '16px',
          border: '1.5px solid #064e3b',
          boxSizing: 'border-box'
        }}
      >
        {/* Realistic Background for Back Side too */}
        <div className="absolute inset-0 z-0">
          <img 
            src={wheatBgUrl} 
            alt="Wheat Field" 
            className="w-full h-full object-cover scale-x-[-1] opacity-60 grayscale-[0.3]"
          />
          <div className="absolute inset-0 bg-white/70"></div>
        </div>

        <div className="h-[75px] bg-emerald-800 flex flex-col justify-center items-center shrink-0 shadow-md border-b border-emerald-900/20 relative z-10">
           <span className="text-white font-black text-[11px] uppercase opacity-100 mb-0.5 tracking-[0.3em]">Farmer Identification System</span>
           <span className="text-white font-black text-[32px] tracking-[0.3em] font-mono leading-none drop-shadow-xl">{data.farmerId}</span>
        </div>

        <div className="flex-grow p-4 flex flex-col gap-3 overflow-hidden relative z-10">
           <div className="bg-white/95 rounded-xl border-2 border-emerald-900 p-2.5 shadow-xl">
              <div className="flex justify-between items-center mb-1 border-b border-emerald-200 pb-0.5">
                <span className="text-[11px] font-black text-emerald-950 uppercase tracking-[0.1em]">Residential Address / निवासी पत्ता</span>
              </div>
              <p className="text-[15px] font-black text-black leading-tight h-[36px] overflow-hidden uppercase">
                {data.address || 'Village Name, Taluka, District, State - Pincode'}
              </p>
           </div>

           <div className="bg-white/95 rounded-xl border-2 border-emerald-900 overflow-hidden flex flex-col h-[120px] shadow-xl">
              <div className="bg-emerald-800 px-4 py-1 flex justify-between items-center text-white">
                <span className="text-[11px] font-black uppercase tracking-[0.1em]">Land Details / जमिनीचा तपशील</span>
                <span className="text-[9px] font-black uppercase bg-emerald-900 px-2 py-0.5 rounded-full border border-white/30 -mt-2.5 shadow-lg">RECORDS: {data.landRecords.length}</span>
              </div>
              <div className="flex-grow overflow-hidden">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="bg-emerald-100/80">
                      <th className="px-2 py-1 text-[10px] font-black text-emerald-950 uppercase border-b-2 border-emerald-200">District</th>
                      <th className="px-2 py-1 text-[10px] font-black text-emerald-950 uppercase border-b-2 border-emerald-200">Taluka</th>
                      <th className="px-2 py-1 text-[10px] font-black text-emerald-950 uppercase border-b-2 border-emerald-200">Village</th>
                      <th className="px-2 py-1 text-[10px] font-black text-emerald-950 uppercase border-b-2 border-emerald-200">Survey No</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-50">
                    {data.landRecords.slice(0, 3).map((record, i) => (
                      <tr key={i}>
                        <td className="px-2 py-1.5 text-[12px] font-black text-black uppercase truncate">{record.district || '-'}</td>
                        <td className="px-2 py-1.5 text-[12px] font-black text-black uppercase truncate">{record.taluka || '-'}</td>
                        <td className="px-2 py-1.5 text-[12px] font-black text-black uppercase truncate">{record.village || '-'}</td>
                        <td className="px-2 py-1.5 text-[13px] font-black text-emerald-950 uppercase bg-emerald-50/40 truncate">{record.surveyNumber || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-3 mt-auto h-[70px]">
              <div className="bg-white/95 rounded-xl border-2 border-dashed border-emerald-900 flex flex-col items-center justify-center p-1 shadow-xl">
                <h2 className="text-[20px] font-black text-emerald-950 italic leading-none drop-shadow-sm">"बळीराजा: जगाचा पोशिंदा"</h2>
                <p className="text-[9px] text-emerald-900 font-black uppercase mt-1 tracking-widest">The Provider Of Life</p>
              </div>
              <div className="bg-emerald-800 text-white p-2 rounded-xl flex flex-col justify-center border-2 border-emerald-950 shadow-2xl">
                <p className="text-[9px] font-black uppercase opacity-100 border-b border-white/20 mb-1 pb-0.5 tracking-tight">Kisan Helpline / हेल्पलाइन</p>
                {/* NUMBER MOVED UP BY ADDING MARGIN TO THE TEXT BELOW IT */}
                <p className="text-[26px] font-black tracking-tighter leading-none font-mono drop-shadow-sm -mb-0.5">1800-180-1551</p>
                <div className="flex items-center gap-1.5 mt-1.5 border-t border-white/10 pt-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-sm shadow-red-500/50"></span>
                  <span className="text-[8px] font-bold uppercase opacity-100">24/7 National Support</span>
                </div>
              </div>
           </div>
        </div>
        
        <div className="h-[22px] bg-emerald-800 shrink-0 flex items-center justify-between px-5 mt-auto border-t border-emerald-900/20 relative z-10">
            <span className="text-[8.5px] text-white font-black uppercase tracking-[0.2em]">
              CREATED BY RATNARAKSHAK GAJBHIYE
            </span>
            <span className="text-[8.5px] text-white font-black uppercase flex items-center gap-1">
              <span className="w-1 h-1 bg-white rounded-full"></span>
              Verified Identity
            </span>
        </div>
      </div>
    </div>
  );
});

IDCardPreview.displayName = 'IDCardPreview';

export default IDCardPreview;

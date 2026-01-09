
import React from 'react';
import { FarmerData, LandRecord } from '../types';
import { User, Phone, MapPin, Hash, Calendar, Camera, Plus, Trash2, Map } from 'lucide-react';

interface Props {
  data: FarmerData;
  onChange: (newData: Partial<FarmerData>) => void;
}

const IDCardForm: React.FC<Props> = ({ data, onChange }) => {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addLandRecord = () => {
    onChange({
      landRecords: [...data.landRecords, { district: '', taluka: '', village: '', surveyNumber: '' }]
    });
  };

  const removeLandRecord = (index: number) => {
    if (data.landRecords.length > 1) {
      const updated = data.landRecords.filter((_, i) => i !== index);
      onChange({ landRecords: updated });
    }
  };

  const updateLandRecord = (index: number, field: keyof LandRecord, value: string) => {
    const updated = data.landRecords.map((record, i) => {
      if (i === index) {
        return { ...record, [field]: value };
      }
      return record;
    });
    onChange({ landRecords: updated });
  };

  return (
    <div className="space-y-4">
      {/* Photo Upload */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="w-24 h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group cursor-pointer">
          {data.photo ? (
            <img src={data.photo} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Camera className="w-8 h-8 text-gray-400" />
          )}
          <input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handlePhotoUpload}
          />
        </div>
        <p className="text-xs text-gray-500">Click to upload passport size photo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600 uppercase flex items-center gap-1">
            <User className="w-3 h-3" /> Full Name (English)
          </label>
          <input
            type="text"
            value={data.fullNameEnglish}
            onChange={(e) => onChange({ fullNameEnglish: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="E.g. Rajesh Kumar"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600 uppercase flex items-center gap-1">
             नाव (मराठी)
          </label>
          <input
            type="text"
            value={data.fullNameMarathi}
            onChange={(e) => onChange({ fullNameMarathi: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none font-devanagari"
            placeholder="उदा. राजेश कुमार"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600 uppercase flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Date of Birth
          </label>
          <input
            type="date"
            value={data.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600 uppercase">Gender</label>
          <select
            value={data.gender}
            onChange={(e) => onChange({ gender: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600 uppercase flex items-center gap-1">
            <Phone className="w-3 h-3" /> WhatsApp Mobile
          </label>
          <input
            type="tel"
            maxLength={10}
            value={data.whatsapp}
            onChange={(e) => onChange({ whatsapp: e.target.value.replace(/\D/g, '') })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="10 digit number"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600 uppercase flex items-center gap-1">
            <Hash className="w-3 h-3" /> Aadhaar Number
          </label>
          <input
            type="text"
            maxLength={12}
            value={data.aadhaar}
            onChange={(e) => onChange({ aadhaar: e.target.value.replace(/\D/g, '') })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="12 digit number"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-600 uppercase flex items-center gap-1">
          <MapPin className="w-3 h-3" /> Full Residential Address
        </label>
        <textarea
          value={data.address}
          onChange={(e) => onChange({ address: e.target.value })}
          rows={2}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="Village, Taluka, District..."
        />
      </div>

      {/* Land Records Section */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <label className="text-xs font-black text-emerald-800 uppercase flex items-center gap-1">
            <Map className="w-3 h-3" /> Land Location (जमिनीचा तपशील)
          </label>
          <button
            onClick={addLandRecord}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black py-1 px-3 rounded-full transition-all"
          >
            <Plus className="w-3 h-3" /> ADD MORE
          </button>
        </div>

        {data.landRecords.map((record, index) => (
          <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-3 relative group">
            {data.landRecords.length > 1 && (
              <button
                onClick={() => removeLandRecord(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase">District (जिल्हा)</p>
                <input
                  type="text"
                  value={record.district}
                  onChange={(e) => updateLandRecord(index, 'district', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
                  placeholder="उदा. पुणे"
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Taluka (तालुका)</p>
                <input
                  type="text"
                  value={record.taluka}
                  onChange={(e) => updateLandRecord(index, 'taluka', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
                  placeholder="उदा. हवेली"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Village (गाव)</p>
                <input
                  type="text"
                  value={record.village}
                  onChange={(e) => updateLandRecord(index, 'village', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
                  placeholder="उदा. कोंढवे"
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Survey No. (सर्व्हे नं.)</p>
                <input
                  type="text"
                  value={record.surveyNumber}
                  onChange={(e) => updateLandRecord(index, 'surveyNumber', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 text-xs font-bold focus:ring-1 focus:ring-emerald-500 outline-none"
                  placeholder="उदा. ४२/१"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1 pt-4 border-t border-gray-100">
        <label className="text-xs font-semibold text-gray-600 uppercase flex items-center gap-1">
          <Hash className="w-3 h-3" /> Farmer ID (Manual/Auto)
        </label>
        <input
          type="text"
          maxLength={12}
          value={data.farmerId}
          onChange={(e) => onChange({ farmerId: e.target.value.replace(/\D/g, '') })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-emerald-800 font-mono font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="Enter ID or keep auto-generated"
        />
      </div>
    </div>
  );
};

export default IDCardForm;

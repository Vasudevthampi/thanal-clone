import React, { useState } from 'react';
import { MapPin, Calendar, CheckCircle2, Send, Clock, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  initialNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialNotes = '' }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [propertyType, setPropertyType] = useState('villa');
  const [timeline, setTimeline] = useState('1_month');
  const [notes, setNotes] = useState(initialNotes);

  const [submitted, setSubmitted] = useState(false);

  // Sync if initialNotes change from estimator click
  React.useEffect(() => {
    if (initialNotes) {
      setNotes((prev) => (prev ? `${prev}\n\n[Applied Estimate]: ${initialNotes}` : initialNotes));
    }
  }, [initialNotes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    setSubmitted(true);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setPropertyLocation('');
    setNotes('');
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-stone-100/70 dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Studio Information & Consultation Commitment */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-forest-800 dark:text-emerald-400 mb-3">
                <span>Direct Dialogue</span>
                <span aria-hidden="true">·</span>
                <span>On-Site Feasibility</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 dark:text-stone-100 leading-tight text-balance">
                Initiate Your Landscape Transformation
              </h2>
              <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Every project begins with a 90-minute on-site microclimate appraisal. Our landscape architects assess natural water flows, solar exposure, native soil composition, and existing tree root networks.
              </p>
            </div>

            {/* Direct Studio Contact Cards */}
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5 p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
                <div className="p-2 bg-stone-100 dark:bg-stone-800 text-forest-800 dark:text-emerald-400 rounded-lg shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-forest-950 dark:text-stone-100">Project planning</div>
                  <div className="text-stone-500 mt-0.5 leading-relaxed">
                    Share your goals, site conditions, and preferred timeline to prepare a landscape concept.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl text-xs text-forest-900 dark:text-emerald-300 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-forest-700 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Confidential Site Audit:</strong> We respect residential privacy. All architectural site visits and cadastral drawings remain strictly confidential.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-10 shadow-lg">
            
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-forest-950 dark:text-stone-100">
                    Project Inquiry Prepared
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your project details are ready for review. This demo form does not send or store information.
                </p>

                <div className="pt-4">
                  <button
                    onClick={handleResetForm}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-forest-900 hover:bg-forest-800 rounded-lg shadow-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-stone-100 dark:border-stone-800 pb-4">
                  <h3 className="font-serif text-xl font-bold text-forest-950 dark:text-stone-100">
                    Schedule an On-Site Consultation
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Please provide your property location and goals so our team can prepare initial topographical notes before calling.
                  </p>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-forest-800 text-stone-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-forest-800 text-stone-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                {/* Email & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="suresh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-forest-800 text-stone-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      Property City / District <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your city or region"
                      value={propertyLocation}
                      onChange={(e) => setPropertyLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-forest-800 text-stone-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Property Type & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      Property Category
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-forest-800 text-stone-900 dark:text-white"
                    >
                      <option value="villa">Residential Villa / Grounds</option>
                      <option value="courtyard">Internal Courtyard Lightwell</option>
                      <option value="terrace">Rooftop / Sky Garden</option>
                      <option value="estate">Sprawling Estate / Resort</option>
                      <option value="commercial">Commercial / Institutional Campus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      Expected Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-forest-800 text-stone-900 dark:text-white"
                    >
                      <option value="immediate">Immediate (Ready to break ground)</option>
                      <option value="1_month">Within 1–2 Months</option>
                      <option value="3_months">Next 3–6 Months (Planning phase)</option>
                      <option value="architectural_collab">Architect Inquiring for Client</option>
                    </select>
                  </div>
                </div>

                {/* Project Notes & Estimate Attachments */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 text-xs">
                      Project Vision, Footprint &amp; Specific Inquiries
                    </label>
                    {notes && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                        Estimate details attached
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Tell us about the space: terrain condition, whether civil house construction is complete, preference for water features, pergolas, or specific tree varieties..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-forest-800 text-stone-900 dark:text-white text-xs leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-forest-900 hover:bg-forest-800 active:bg-forest-950 transition-colors rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span>Request Architectural Consultation</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronRight, MousePointer, FileText, User, Target, Zap, DollarSign, Database, ArrowRight, ArrowDown, Link, Settings, Download, BarChart2, FolderOpen, Layers } from 'lucide-react';

export default function UTMAttributionFlow() {
  const [activeExample, setActiveExample] = useState(0);
  const [activeModel, setActiveModel] = useState(0); // default to First Touch
  const [exporting, setExporting] = useState(false);
  const pageRef = useRef(null);

  const handleDownloadPDF = async () => {
    setExporting(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');
      const canvas = await html2canvas(pageRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0f172a',
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save('utm-attribution-flow.pdf');
    } finally {
      setExporting(false);
    }
  };

  const examples = [
    {
      name: "Paid Social → Webinar → Sales Call → Meeting",
      journey: [
        { touch: 1, triggerType: 'form',        action: "Downloads Guide via LinkedIn Ad",       utm: "utm_source=linkedin&utm_medium=paid_social&utm_campaign=q1_demand_gen",      channel: "Paid Social" },
        { touch: 2, triggerType: 'email_click',  action: "Clicks Nurture Email (Case Study)",    utm: "utm_source=hubspot&utm_medium=email&utm_campaign=mid_funnel_nurture",        channel: "Email"       },
        { touch: 3, triggerType: 'webinar',      action: "Attends Live Product Webinar",         utm: "utm_source=webinar&utm_medium=event&utm_campaign=q1_product_demo",           channel: "Events"      },
        { touch: 4, triggerType: 'email_click',  action: "Clicks Webinar Follow-up Email",       utm: "utm_source=hubspot&utm_medium=email&utm_campaign=webinar_followup_q1",      channel: "Email"       },
        { touch: 5, triggerType: 'call',         action: "Sales Call Connected (23 min)",        utm: "utm_source=sales&utm_medium=call&utm_campaign=sdr_outbound_tier1",           channel: "Sales"       },
        { touch: 6, triggerType: 'meeting',      action: "Books Discovery Meeting",              utm: "utm_source=sales&utm_medium=meeting&utm_campaign=ae_discovery",              channel: "Sales"       },
      ],
    },
    {
      name: "SDR Outbound → Self-Educate → Inbound",
      journey: [
        { touch: 1, triggerType: 'sales_reply',  action: "Replies to Outbound SDR Email",        utm: "utm_source=sales&utm_medium=email&utm_campaign=sdr_cold_outreach",           channel: "Sales"   },
        { touch: 2, triggerType: 'page_view',    action: "Views Pricing Page (high-intent)",     utm: "utm_source=sales&utm_medium=email (last known UTMs)",                        channel: "Inbound" },
        { touch: 3, triggerType: 'email_click',  action: "Clicks Competitive Comparison Email",  utm: "utm_source=hubspot&utm_medium=email&utm_campaign=competitor_nurture",        channel: "Email"   },
        { touch: 4, triggerType: 'chat',         action: "Starts Live Chat on Demo Page",        utm: "utm_source=website&utm_medium=chat&utm_campaign=inbound",                    channel: "Chat"    },
        { touch: 5, triggerType: 'form',         action: "Submits Demo Request Form",            utm: "utm_source=hubspot&utm_medium=email&utm_campaign=competitor_nurture",        channel: "Email"   },
      ],
    },
    {
      name: "Event-Led Pipeline",
      journey: [
        { touch: 1, triggerType: 'form',         action: "Registers for Virtual Summit",         utm: "utm_source=linkedin&utm_medium=paid_social&utm_campaign=summit_2026",        channel: "Paid Social" },
        { touch: 2, triggerType: 'webinar',      action: "Attends Virtual Summit (full session)",utm: "utm_source=webinar&utm_medium=event&utm_campaign=summit_2026",               channel: "Events"      },
        { touch: 3, triggerType: 'email_click',  action: "Clicks Post-Event Resource Email",     utm: "utm_source=hubspot&utm_medium=email&utm_campaign=summit_followup",           channel: "Email"       },
        { touch: 4, triggerType: 'sales_reply',  action: "Replies to AE Follow-Up Email",        utm: "utm_source=sales&utm_medium=email&utm_campaign=summit_ae_outreach",          channel: "Sales"       },
        { touch: 5, triggerType: 'meeting',      action: "Books Intro Call",                     utm: "utm_source=sales&utm_medium=meeting&utm_campaign=ae_discovery",              channel: "Sales"       },
      ],
    },
  ];

  const currentExample = examples[activeExample];

  const TRIGGER_STYLES = {
    form:        { label: 'Form Submit',       badge: 'bg-green-800 text-green-200 border border-green-600',     bar: 'bg-green-500'  },
    email_click: { label: 'Email Click',       badge: 'bg-blue-800 text-blue-200 border border-blue-600',       bar: 'bg-blue-500'   },
    meeting:     { label: 'Meeting Booked',    badge: 'bg-purple-800 text-purple-200 border border-purple-600', bar: 'bg-purple-500' },
    webinar:     { label: 'Webinar Attended',  badge: 'bg-orange-800 text-orange-200 border border-orange-600', bar: 'bg-orange-500' },
    call:        { label: 'Call Logged',       badge: 'bg-yellow-800 text-yellow-200 border border-yellow-600', bar: 'bg-yellow-400' },
    chat:        { label: 'Chat Started',      badge: 'bg-cyan-800 text-cyan-200 border border-cyan-600',       bar: 'bg-cyan-500'   },
    page_view:   { label: 'Page View',         badge: 'bg-slate-600 text-slate-200 border border-slate-500',    bar: 'bg-slate-400'  },
    sales_reply: { label: 'Sales Email Reply', badge: 'bg-rose-800 text-rose-200 border border-rose-600',       bar: 'bg-rose-500'   },
  };

  const ATTRIBUTION_MODELS = [
    { id: 'first_touch', label: 'First Touch', desc: '100% credit to the very first touchpoint. Answers: "What first attracted this prospect?" Sourced Attribution on the deal is set to this touchpoint\'s Motion.', bestFor: 'Brand awareness & top-of-funnel reporting' },
    { id: 'last_touch',  label: 'Last Touch',  desc: '100% credit to the final touchpoint before deal creation. Answers: "What finally converted them?" Closed Attribution on the deal is set to this touchpoint\'s Motion.', bestFor: 'Sales & conversion reporting' },
    { id: 'linear',      label: 'Linear',      desc: 'Equal credit split across every touchpoint. No channel is over- or under-valued — a neutral baseline for comparing Motions.', bestFor: 'Fair baseline comparison across Motions' },
    { id: 'u_shaped',    label: 'U-Shaped',    desc: '40% to first touch + 40% to last touch. Remaining 20% split evenly across middle touches. Rewards what attracts and what converts.', bestFor: 'Marketing + Sales alignment' },
    { id: 'w_shaped',    label: 'W-Shaped',    desc: '30% each to first touch, the opportunity-creating middle touch, and last touch. 10% split across remaining touches.', bestFor: 'Full-funnel B2B orgs with clear stage gates' },
    { id: 'time_decay',  label: 'Time Decay',  desc: 'Credit increases exponentially for more recent touches. The closer to deal creation, the more weight assigned. Best reflects fast-moving deals.', bestFor: 'Short or high-velocity sales cycles' },
  ];

  function getWeights(modelId, journey) {
    const n = journey.length;
    switch (modelId) {
      case 'first_touch': return journey.map((_, i) => i === 0 ? 100 : 0);
      case 'last_touch':  return journey.map((_, i) => i === n - 1 ? 100 : 0);
      case 'linear':      return journey.map(() => parseFloat((100 / n).toFixed(1)));
      case 'u_shaped': {
        if (n === 1) return [100];
        if (n === 2) return [50, 50];
        const mid = parseFloat((20 / (n - 2)).toFixed(1));
        return journey.map((_, i) => i === 0 ? 40 : i === n - 1 ? 40 : mid);
      }
      case 'w_shaped': {
        if (n <= 3) return journey.map(() => parseFloat((100 / n).toFixed(1)));
        const midIdx = Math.floor((n - 1) / 2);
        const otherCount = n - 3;
        const small = otherCount > 0 ? parseFloat((10 / otherCount).toFixed(1)) : 0;
        return journey.map((_, i) => i === 0 ? 30 : i === n - 1 ? 30 : i === midIdx ? 30 : small);
      }
      case 'time_decay': {
        const raw = journey.map((_, i) => Math.pow(2, i));
        const sum = raw.reduce((a, b) => a + b, 0);
        return raw.map(v => parseFloat((v / sum * 100).toFixed(1)));
      }
      default:   return journey.map(() => parseFloat((100 / n).toFixed(1)));
    }
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold mb-2">UTM → HubSpot Attribution Flow</h1>
          <p className="text-slate-400">How UTM parameters flow through your custom attribution system</p>
          <button
            onClick={handleDownloadPDF}
            disabled={exporting}
            className="absolute right-0 top-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Download size={16} />
            {exporting ? 'Exporting...' : 'Download PDF'}
          </button>
        </div>

        {/* Main Flow Diagram */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700">
          <h2 className="text-lg font-semibold mb-6 text-center text-slate-300">System Architecture</h2>
          
          <div className="flex flex-col items-center gap-2">
            
            {/* Row 1: UTM Link Click */}
            <div className="flex items-center gap-4 w-full justify-center">
              <div className="bg-blue-600 rounded-xl p-4 w-64 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MousePointer size={20} />
                  <span className="font-semibold">1. Visitor Clicks UTM Link</span>
                </div>
                <code className="text-xs bg-blue-800 px-2 py-1 rounded block mt-2 break-all">
                  yoursite.com?utm_source=linkedin&utm_medium=paid_social&utm_campaign=q1_launch
                </code>
              </div>
            </div>

            <ArrowDown className="text-slate-500" />

            {/* Row 2: HubSpot Captures */}
            <div className="flex items-center gap-4 w-full justify-center">
              <div className="bg-orange-600 rounded-xl p-4 w-80 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Database size={20} />
                  <span className="font-semibold">2. HubSpot Tracking Captures UTMs</span>
                </div>
                <p className="text-xs text-orange-200">Stored in browser cookie → Available on form submit</p>
              </div>
            </div>

            <ArrowDown className="text-slate-500" />

            {/* Row 3: Form Submission */}
            <div className="flex items-center gap-4 w-full justify-center">
              <div className="bg-green-600 rounded-xl p-4 w-80 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FileText size={20} />
                  <span className="font-semibold">3. Form Submission</span>
                </div>
                <p className="text-xs text-green-200">Hidden fields auto-populate with UTM values</p>
                <div className="flex gap-2 mt-2 justify-center flex-wrap">
                  {['utm_source', 'utm_medium', 'utm_campaign'].map(field => (
                    <span key={field} className="bg-green-800 px-2 py-0.5 rounded text-xs">{field}</span>
                  ))}
                </div>
              </div>
            </div>

            <ArrowDown className="text-slate-500" />

            {/* Row 4: Contact + Touchpoint Created */}
            <div className="flex items-center gap-6 w-full justify-center">
              <div className="bg-purple-600 rounded-xl p-4 w-56 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <User size={20} />
                  <span className="font-semibold">4a. Contact Record</span>
                </div>
                <p className="text-xs text-purple-200">Created/updated with UTM properties</p>
              </div>
              
              <span className="text-slate-500 text-2xl">+</span>
              
              <div className="bg-pink-600 rounded-xl p-4 w-56 text-center border-2 border-pink-400">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target size={20} />
                  <span className="font-semibold">4b. Touchpoint (Custom)</span>
                </div>
                <p className="text-xs text-pink-200">Workflow creates touchpoint record</p>
              </div>
            </div>

            <ArrowDown className="text-slate-500" />

            {/* Row 5: Workflow Processing */}
            <div className="bg-yellow-600 rounded-xl p-4 w-full max-w-2xl">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Zap size={20} />
                <span className="font-semibold">5. Campaign Initialization Workflow (JavaScript)</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="bg-yellow-700 rounded p-2">
                  <p className="font-semibold mb-1">CHANNEL_MAPPING</p>
                  <p className="text-yellow-200">linkedin + paid_social → "Paid Social" Motion type</p>
                </div>
                <div className="bg-yellow-700 rounded p-2">
                  <p className="font-semibold mb-1">Looks Up / Creates Motion</p>
                  <p className="text-yellow-200">The trackable effort: budget, channel, dates, goals</p>
                </div>
                <div className="bg-yellow-700 rounded p-2">
                  <p className="font-semibold mb-1">Rolls Up to Campaign</p>
                  <p className="text-yellow-200">Campaign = the folder grouping related Motions</p>
                </div>
              </div>
            </div>

            <ArrowDown className="text-slate-500" />

            {/* Row 6: Object Hierarchy */}
            <div className="bg-slate-700 rounded-xl p-4 w-full max-w-5xl">
              <p className="text-center text-sm text-slate-400 mb-4">6. HubSpot Object Hierarchy (Associations)</p>
              <div className="flex items-start justify-center gap-2">

                {/* Campaign */}
                <div className="bg-indigo-700 rounded-xl p-3 w-52 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-1">
                    <FolderOpen size={14} className="text-indigo-300" />
                    <span className="text-xs text-indigo-300 font-medium">Native HubSpot</span>
                  </div>
                  <p className="font-bold text-sm mb-1">Campaign</p>
                  <p className="text-xs text-indigo-200 italic mb-2">"The Folder"</p>
                  <p className="text-xs text-indigo-200">Groups related Motions for rolled-up reporting. No budget, no tracking — pure organization.</p>
                  <p className="text-xs text-indigo-300 mt-2 font-medium">e.g. "Q1 2026 Product Launch"</p>
                </div>

                <div className="flex items-center pt-8"><ArrowRight className="text-slate-500" /></div>

                {/* Motion */}
                <div className="bg-cyan-700 rounded-xl p-3 w-56 flex-shrink-0 border-2 border-cyan-400">
                  <div className="flex items-center gap-2 mb-1">
                    <Layers size={14} className="text-cyan-300" />
                    <span className="text-xs text-cyan-300 font-medium">Custom Object</span>
                  </div>
                  <p className="font-bold text-sm mb-1">Motion</p>
                  <p className="text-xs text-cyan-200 italic mb-2">"The Effort"</p>
                  <p className="text-xs text-cyan-200">A specific, trackable initiative with budget, channel, dates, and goals. This is where ROI is measured.</p>
                  <p className="text-xs text-cyan-300 mt-2 font-medium">e.g. "Q1 Launch — LinkedIn Ads" ($5K, Jan–Mar)</p>
                </div>

                <div className="flex items-center pt-8"><ArrowRight className="text-slate-500" /></div>

                {/* Touchpoint */}
                <div className="bg-pink-700 rounded-xl p-3 w-56 flex-shrink-0 border-2 border-pink-400">
                  <div className="flex items-center gap-2 mb-1">
                    <Target size={14} className="text-pink-300" />
                    <span className="text-xs text-pink-300 font-medium">Custom Object</span>
                  </div>
                  <p className="font-bold text-sm mb-1">Touchpoint</p>
                  <p className="text-xs text-pink-200 italic mb-2">"The Interaction"</p>
                  <p className="text-xs text-pink-200">A single moment a person engaged — form fill, call, email reply, meeting booked. Tied to Contact + Deal.</p>
                  <p className="text-xs text-pink-300 mt-2 font-medium">e.g. "Jane clicked LinkedIn ad — Feb 3"</p>
                </div>

                <div className="flex items-center pt-8"><ArrowRight className="text-slate-500" /></div>

                {/* Contact + Deal */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <div className="bg-purple-700 rounded-xl p-3 w-36 text-center">
                    <User size={14} className="text-purple-300 mx-auto mb-1" />
                    <p className="text-xs text-purple-300 font-medium">Native</p>
                    <p className="font-bold text-sm">Contact</p>
                  </div>
                  <div className="bg-emerald-700 rounded-xl p-3 w-36 text-center">
                    <DollarSign size={14} className="text-emerald-300 mx-auto mb-1" />
                    <p className="text-xs text-emerald-300 font-medium">Native</p>
                    <p className="font-bold text-sm">Deal</p>
                  </div>
                </div>

              </div>
            </div>

            <ArrowDown className="text-slate-500" />

            {/* Row 7: Deal Creation + Attribution */}
            <div className="flex items-center gap-6 w-full justify-center">
              <div className="bg-emerald-600 rounded-xl p-4 w-64 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign size={20} />
                  <span className="font-semibold">7. Deal Created</span>
                </div>
                <p className="text-xs text-emerald-200">Workflow associates all Contact's Touchpoints → Deal</p>
              </div>

              <ArrowRight className="text-slate-500" />

              <div className="bg-violet-600 rounded-xl p-4 w-64 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <BarChart2 size={20} />
                  <span className="font-semibold">8. Attribution Workflow</span>
                </div>
                <p className="text-xs text-violet-200">Reads touchpoint sequence, applies model logic, writes Sourced + Closed to deal</p>
              </div>
            </div>

            <ArrowDown className="text-slate-500" />

            {/* Row 8: Attribution Output */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 w-full max-w-3xl">
              <p className="text-center font-semibold mb-3">9. Attribution Output (Written to Deal)</p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-semibold text-blue-200">Sourced Attribution</p>
                  <p className="text-xs mt-1">"What created this opportunity?"</p>
                  <p className="text-xs text-slate-300 mt-2">→ First meaningful touchpoint</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3 border border-white/30">
                  <p className="font-semibold text-white">Multi-Touch Models</p>
                  <p className="text-xs mt-1 text-slate-200">Linear · U-Shaped · W-Shaped · Time Decay</p>
                  <p className="text-xs text-slate-300 mt-2">→ Distributes credit across the full journey</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-semibold text-purple-200">Closed Attribution</p>
                  <p className="text-xs mt-1">"What pushed them to buy?"</p>
                  <p className="text-xs text-slate-300 mt-2">→ Last touchpoint before deal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example Journeys */}
        <div className="mt-8 bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-1 text-center text-slate-300">Example Customer Journeys</h2>
          <p className="text-center text-xs text-slate-500 mb-5">Touchpoints are created by 8+ trigger types — not just form fills. Each interaction below captures a signal in HubSpot.</p>

          {/* Trigger type legend */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {Object.entries(TRIGGER_STYLES).map(([type, style]) => (
              <span key={type} className={`px-2 py-0.5 rounded text-xs font-medium ${style.badge}`}>{style.label}</span>
            ))}
          </div>

          {/* Example Tabs */}
          <div className="flex gap-2 mb-6 justify-center flex-wrap">
            {examples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setActiveExample(idx)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeExample === idx
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {ex.name.split('→')[0].trim()}...
              </button>
            ))}
          </div>

          {/* Journey Timeline */}
          <div>
            <h3 className="text-center text-slate-400 mb-4 text-sm">{currentExample.name}</h3>
            <div className="space-y-3">
              {currentExample.journey.map((step, idx) => {
                const style = TRIGGER_STYLES[step.triggerType];
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 text-white ${style.bar}`}>
                      {step.touch}
                    </div>
                    <div className="flex-1 bg-slate-700 rounded-lg p-3">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <span className="font-medium text-sm">{step.action}</span>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${style.badge}`}>{style.label}</span>
                          <span className="bg-slate-600 px-2 py-0.5 rounded text-xs">{step.channel}</span>
                        </div>
                      </div>
                      <code className="text-xs text-slate-400 break-all block">{step.utm}</code>
                      <p className="text-xs text-pink-400 mt-2">→ Touchpoint Created</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Attribution Models */}
        <div className="mt-8 bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-1 text-center text-slate-300">Attribution Models — Same Journey, Different Credit</h2>
          <p className="text-center text-xs text-slate-500 mb-6">Select a model to see how the {currentExample.journey.length}-touchpoint journey above gets credited differently depending on the methodology</p>

          {/* Model selector */}
          <div className="flex gap-2 flex-wrap justify-center mb-6">
            {ATTRIBUTION_MODELS.map((model, idx) => (
              <button
                key={model.id}
                onClick={() => setActiveModel(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeModel === idx
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {model.label}
              </button>
            ))}
          </div>

          {/* Credit bars */}
          <div className="space-y-2.5 mb-6">
            {(() => {
              const model = ATTRIBUTION_MODELS[activeModel];
              const weights = getWeights(model.id, currentExample.journey);
              return currentExample.journey.map((step, idx) => {
                const pct = weights[idx];
                const style = TRIGGER_STYLES[step.triggerType];
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full ${style.bar} flex items-center justify-center text-xs font-bold flex-shrink-0 text-white`}>
                      {step.touch}
                    </div>
                    <div className="w-44 flex-shrink-0 text-xs text-slate-300 truncate">{step.action}</div>
                    <div className="flex-1 bg-slate-700 rounded-full h-6 overflow-hidden">
                      <div
                        className={`h-full ${style.bar} rounded-full flex items-center justify-end pr-2 transition-all duration-500`}
                        style={{ width: `${pct > 0 ? Math.max(pct, 1) : 0}%` }}
                      >
                        {pct >= 8 && <span className="text-xs font-bold text-white">{pct}%</span>}
                      </div>
                    </div>
                    <div className="w-12 text-right text-xs font-mono text-slate-200 font-semibold">{pct}%</div>
                  </div>
                );
              });
            })()}
          </div>

          {/* Model description */}
          {(() => {
            const model = ATTRIBUTION_MODELS[activeModel];
            return (
              <div className="rounded-xl p-4 bg-slate-700/50 border border-slate-600">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-1">{model.label}</p>
                    <p className="text-xs text-slate-300">{model.desc}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-slate-500 mb-0.5">Best for</p>
                    <p className="text-xs font-medium text-blue-300">{model.bestFor}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Technical Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Touchpoint Data Model */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Target size={18} className="text-pink-400" />
              Touchpoint Object Properties
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { prop: 'touchpoint_timestamp', desc: 'When interaction occurred', source: 'Auto-set' },
                { prop: 'touchpoint_source', desc: 'utm_source value', source: 'From UTM' },
                { prop: 'touchpoint_medium', desc: 'utm_medium value', source: 'From UTM' },
                { prop: 'touchpoint_campaign', desc: 'utm_campaign value', source: 'From UTM' },
                { prop: 'touchpoint_content', desc: 'utm_content value', source: 'From UTM' },
                { prop: 'touchpoint_term', desc: 'utm_term value', source: 'From UTM' },
                { prop: 'touchpoint_form', desc: 'Which form submitted', source: 'Form name' },
                { prop: 'touchpoint_page', desc: 'Landing page URL', source: 'Page URL' },
              ].map(item => (
                <div key={item.prop} className="flex items-center justify-between bg-slate-700/50 rounded px-3 py-1.5">
                  <code className="text-pink-300 text-xs">{item.prop}</code>
                  <span className="text-slate-400 text-xs">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Channel Mapping */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Settings size={18} className="text-yellow-400" />
              CHANNEL_MAPPING Logic
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { source: 'google', medium: 'cpc', channel: 'Paid Search' },
                { source: 'linkedin', medium: 'paid_social', channel: 'Paid Social' },
                { source: 'linkedin', medium: 'organic_social', channel: 'Organic Social' },
                { source: 'hubspot', medium: 'email', channel: 'Email Marketing' },
                { source: 'partner', medium: 'referral', channel: 'Referrals' },
                { source: 'google', medium: 'display', channel: 'Display' },
                { source: 'webinar', medium: 'event', channel: 'Events' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-700/50 rounded px-3 py-1.5">
                  <code className="text-blue-300 text-xs">{item.source}</code>
                  <span className="text-slate-500">+</span>
                  <code className="text-green-300 text-xs">{item.medium}</code>
                  <ArrowRight size={14} className="text-slate-500" />
                  <span className="text-yellow-300 text-xs font-medium">{item.channel}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">Edit in workflow code & UTM Generator spreadsheet</p>
          </div>
        </div>

        {/* Key Points */}
        <div className="mt-8 bg-blue-900/30 border border-blue-700 rounded-xl p-5">
          <h3 className="font-semibold mb-3 text-blue-300">Key Points</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span><strong>Touchpoints created by 8+ trigger types</strong> — form submissions (MVP), email clicks, meeting bookings, webinar attendance, connected calls, chat sessions, high-intent page views, and sales email replies. Each creates a touchpoint record in HubSpot via workflow.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span><strong>UTM consistency is critical</strong> — use the UTM Generator spreadsheet to ensure source/medium values match your CHANNEL_MAPPING</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span><strong>Attribution happens at Deal creation</strong> — all pre-deal touchpoints are analyzed; post-deal touchpoints don't affect attribution</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span><strong>Six attribution models supported</strong> — First Touch (Sourced), Last Touch (Closed), Linear, U-Shaped, W-Shaped, and Time Decay. Sourced Attribution and Closed Attribution are written to every HubSpot deal by a workflow. Multi-touch models distribute credit across the full journey for deeper Motion-level ROI analysis.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
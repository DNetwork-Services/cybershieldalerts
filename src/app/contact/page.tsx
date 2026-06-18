import { Metadata } from 'next';
import { SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with CyberShield Alerts.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Contact <span className="hb-gradient-text">Us</span>
          </h1>
          <p className="text-lg text-gray-400">
            Have a tip, story, or want to collaborate? Get in touch.
          </p>
          <div className="section-divider mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="hb-glass-card p-8">
            <h2 className="text-xl font-display font-bold text-white mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input type="text" className="hb-input" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input type="email" className="hb-input" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Subject</label>
                <input type="text" className="hb-input" placeholder="Message subject" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea className="hb-input min-h-[150px]" placeholder="Your message..." />
              </div>
              <button type="submit" className="hb-button w-full">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="hb-glass-card p-8">
              <h2 className="text-xl font-display font-bold text-white mb-4">Follow Us</h2>
              <p className="text-gray-400 mb-4">
                Follow CyberShield Alerts for daily cybersecurity updates.
              </p>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-cyber-gray/30 hover:bg-cyber-gray/50 transition-colors text-gray-300 hover:text-cyber-cyan"
                  >
                    <span className="font-medium">{social.platform}</span>
                    <span className="text-sm text-gray-500">{social.username}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="hb-glass-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyber-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-display font-bold text-white">Tip Line</h2>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Found a security vulnerability or have a story tip? Reach out securely.
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <svg className="w-4 h-4 text-cyber-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                We verify all tips and protect source anonymity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

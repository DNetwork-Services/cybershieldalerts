import { Metadata } from 'next';
import { SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with CyberShield Alerts.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-lg text-gray-400">
            Have a tip, story, or want to collaborate? Get in touch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="cyber-card">
            <h2 className="text-xl font-display font-bold text-white mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input type="text" className="cyber-input" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input type="email" className="cyber-input" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Subject</label>
                <input type="text" className="cyber-input" placeholder="Message subject" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea className="cyber-input min-h-[150px]" placeholder="Your message..." />
              </div>
              <button type="submit" className="cyber-button w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="cyber-card">
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

            <div className="cyber-card">
              <h2 className="text-xl font-display font-bold text-white mb-4">Tip Line</h2>
              <p className="text-gray-400 mb-4">
                Found a security vulnerability or have a story tip? Reach out securely.
              </p>
              <p className="text-sm text-gray-500">
                We verify all tips and protect source anonymity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

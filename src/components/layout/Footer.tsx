import Link from "next/link";
import { HeartHandshake, Globe, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-primary font-heading text-2xl font-semibold mb-4">
              <HeartHandshake className="h-8 w-8" />
              <span>Eternity</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              The world&apos;s most trusted and luxurious matchmaking service, designed to help you find your perfect life partner.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors"><MessageCircle className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Globe className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Mail className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Press</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Safety Tips</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Community Guidelines</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© 2025 Eternity Matrimony. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Made with ❤️ for beautiful beginnings.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Facebook, Globe, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background fixed bottom-0 w-full border-t">
      <div className="container mx-auto flex items-center justify-between gap-4 px-2 py-4">
        <p className="text-muted-foreground text-center text-sm">
          © 2025 Patient App. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://patientapp.com"
            target="_blank"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Globe className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

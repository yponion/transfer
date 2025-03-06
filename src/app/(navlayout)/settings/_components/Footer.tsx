export default function Footer() {
  return (
    <footer className="w-full h-12 flex items-center justify-center">
      <span className="text-sm text-center">
        © 2025. Yang jeong un. All rights reserved.{" "}
        {process.env.NEXT_PUBLIC_EMAIL}
      </span>
    </footer>
  );
}

import React from "react";

interface WhatsAppIconProps {
  className?: string;
}

export default function WhatsAppIcon({ className = "w-5 h-5" }: WhatsAppIconProps) {
  return (
    <img
      src="/whatsapp-icon.png"
      alt="WhatsApp Logo"
      className={`${className} object-contain inline-block rounded-lg`}
    />
  );
}

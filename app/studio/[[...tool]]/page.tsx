"use client"; // INI YANG WAJIB DITAMBAHKAN

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config'; // Path bisa beda tergantung posisi

export default function StudioPage() {
  return <NextStudio config={config} />;
}
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '../index.css';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'OnamKulam - Interior',
    description: 'Interior Design Portfolio',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}

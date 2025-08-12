import LogoGrid from "./LogoGrid";
import Newsletter from "./Newsletter";
import Image from "next/image";
import { Button } from "@/components/ui/button"

const logos = [
  { src: "/Family-Bank.png", alt: "Family Bank" },
  { src: "/Blackbow consult.png", alt: "Blackbow Consult" },
  { src: "/MEB.png", alt: "MEB Bank" },
  { src: "/SMEBank.png", alt: "SME Bank" },
  { src: "/Consolidated-Bank.png", alt: "Consolidated Bank" },
];

type SharedPageSectionsProps = {
  variant?: 'default' | 'contacts';
};

const SharedPageSections: React.FC<SharedPageSectionsProps> = ({ variant = 'default' }) => {
    return (
        <>
            <LogoGrid logos={logos} />
            <Newsletter 
              title={variant === 'contacts' ? "Want quick help? Reach out to us WhatsApp chat!" : undefined}
              subtitle={variant === 'contacts' ? "For instant assistance, chat with us directly on WhatsApp! Simply click the floating WhatsApp icon at the bottom right corner of your screen. On mobile devices, this will open directly in your WhatsApp application, making it easier than ever to get the help you need." : undefined}
              customContent={
                variant === 'contacts' ? (
                  <div className="h-0"></div>
                ) : undefined
              }
            />
        </>
    )
}

export default SharedPageSections; 
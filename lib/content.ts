import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const homeContent = {
    hero: {
        title: "Your Partner in Customized <br/> Trade Finance, Insurance & <br/> Investment Solutions Across Africa",
        subtitle: "Home of your customized trade finance solutions in Kenya and across Africa.",
        backgroundImage: "/Home2Hero.png"
    },
    services: {
        title: "Services",
        items: [
            { icon: "🏦", title: "Trade Finance", description: "Unlock global trade opportunities with our tailored financing solutions." },
            { icon: "💼", title: "Investment Advisory", description: "Expert guidance to help you make informed investment decisions." },
            { icon: "🛡️", title: "Insurance Solutions", description: "Comprehensive coverage to protect your assets and mitigate risks." }
        ]
    },
    visionMission: {
        title: "Vision & Mission",
        visionText: "To be the preferred financial consultant in Kenya and the rest of Africa through the provision of seamless and tailor made solutions.",
        missionText: "To inspire entrepreneurship and innovation in Kenya and the rest of the world.",
        image: "/why-choose-us-banner.jpg"
    }
};

export async function seedHomeContent() {
    try {
        await setDoc(doc(db, "pages", "home"), homeContent);
        return { success: true, message: "Homepage content seeded successfully." };
    } catch (error) {
        console.error("Error seeding content:", error);
        throw error;
    }
} 
import { useState, useEffect } from "react";
import AvisosList from "../components/avisos/AvisosList";
import { useCampanhas } from "../hooks/useCampanhas";
import {
  HomeHero,
  HomeCampanhas,
  HomeContact,
  HomeGallery,
  HomeSearch,
  HomeServices,
  HomeSocialMedia,
  HomeEmergency,
} from "../components/home";
import { loadGalleryImages } from "../utils/galleryUtils";

export default function Home() {
  const { campanhas, loading: loadingCampanhas } = useCampanhas();
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setLoadingImages(true);
      const images = await loadGalleryImages();
      setGalleryImages(images);
      setLoadingImages(false);
    };
    loadImages();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <HomeHero />
        <HomeCampanhas campanhas={campanhas} loading={loadingCampanhas} />
        <AvisosList />
        <HomeContact />
      </div>
      <HomeGallery images={galleryImages} loading={loadingImages} />
      <HomeSearch />
      <HomeServices />
      <HomeSocialMedia />
      <HomeEmergency />
    </div>
  );
}

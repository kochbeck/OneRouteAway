'use client';

import { useEffect, useState } from 'react';
import MainView from './components/MainView';
import { requestLocationPermission } from './utils/location';
import Modal from './components/Modal';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    requestLocationPermission().then((permissionGranted: boolean) => {
      setHasLocationPermission(permissionGranted);
      setIsModalOpen(!permissionGranted);
    });
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleAllow = async () => {
    const permissionGranted = await requestLocationPermission();
    setHasLocationPermission(permissionGranted);
    setIsModalOpen(!permissionGranted);
  }
  if (isModalOpen) {
    return <Modal isOpen={isModalOpen} onClose={handleClose} onAllow={handleAllow} />;
  }

  return hasLocationPermission === true ? <MainView /> : <></>;
}


'use client';

import { useEffect, useState } from 'react';
import MainView from './components/MainView';
import { requestLocationPermission } from './utils/location';
import Modal from './components/Modal';

export default function Home() {
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

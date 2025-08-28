import { useState, useCallback } from 'react';

export const useAdLoader = () => {
 const [adsVisible, setAdsVisible] = useState(false);

 const triggerAdLoad = useCallback(() => {
 if (!adsVisible) {
 setAdsVisible(true);
 }
 }, [adsVisible]);

 return { adsVisible, triggerAdLoad };
};

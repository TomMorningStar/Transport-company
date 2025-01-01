import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

export const getMapIcon = (name: string) => {
  const iconMarkup = renderToStaticMarkup(<img src={`/${name}.svg`} alt="icon" />);
  const customMarketIcon = divIcon({
    html: iconMarkup,
  });
  return customMarketIcon;
};

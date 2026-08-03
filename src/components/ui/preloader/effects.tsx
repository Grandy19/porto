import { PreloaderState } from './constants';

interface EffectsProps {
  stage: PreloaderState;
}

export function Effects({ stage: _stage }: EffectsProps) {
  // Prevent postprocessing buffer black screen bugs across different GPU drivers
  return null;
}

import { IconDots } from '@tabler/icons-react';
import { FC } from 'react';

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div
      className="group rounded-tl-none border-b border-black/10  bg-gray-200 text-gray-800 dark:border-gray-900/50 dark:bg-zinc-700 dark:text-gray-100"
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="flex gap-4 p-4 m-auto text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl sender">
        <div className="min-w-[40px] text-right font-bold">AI:</div>
        <IconDots className="animate-pulse" />
      </div>
    </div>
  );
};

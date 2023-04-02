import { IconDots } from '@tabler/icons-react';
import { FC } from 'react';

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div
      className="group border-b border-black/10 bg-gray-50 text-gray-800 dark:border-gray-900/50 dark:bg-[#444654] dark:text-gray-100"
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="rounded-tl-none border-b border-black/10  bg-gray-200 text-gray-800 dark:border-gray-900/50 dark:bg-zinc-700 dark:text-gray-100">
        <div className="min-w-[40px] text-right font-bold">AI:</div>
        <IconDots className="animate-pulse" />
      </div>
    </div>
  );
};

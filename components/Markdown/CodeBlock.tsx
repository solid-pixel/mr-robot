import {
  generateRandomString,
  programmingLanguages,
} from '@/utils/app/codeblock';
import { IconCheck, IconClipboard, IconDownload } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import { FC, memo, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Props {
  language: string;
  value: string;
}

export const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { t } = useTranslation('markdown');
  const [isCopied, setIsCopied] = useState<Boolean>(false);

  const copyToClipboard = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
  const downloadAsFile = () => {
    const fileExtension = programmingLanguages[language] || '.file';
    const suggestedFileName = `file-${generateRandomString(
      3,
      true,
    )}${fileExtension}`;
    const fileName = window.prompt(
      t('Enter file name') || '',
      suggestedFileName,
    );

    if (!fileName) {
      // user pressed cancel on prompt
      return;
    }

    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="codeblock relative font-sans text-[16px]">
      <div className="flex items-center justify-between py-1.5 px-4">
        <span className="text-xs lowercase text-zinc-400">{language}</span>

        <div className="flex items-center">
          <button
            className="flex gap-1.5 items-center rounded bg-none p-1 text-xs text-zinc-400 hover:text-emerald-400"
            onClick={copyToClipboard}
          >
            {isCopied ? (
              <IconCheck size={18} />
            ) : (
              <IconClipboard size={18} />
            )}
            {isCopied ? t('Copied!') : t('Copy code')}
          </button>
          <button
            className="flex items-center rounded bg-none p-1 text-xs text-zinc-400 hover:text-emerald-400"
            onClick={downloadAsFile}
          >
            <IconDownload size={18} />
          </button>
        </div>
      </div>

      <SyntaxHighlighter
        language={language}
        style={materialDark}
        customStyle={{ margin: 0, lineHeight: '1.5rem', background: 'linear-gradient(135deg, rgb(31 31 35), rgba(84, 22, 210, 0.07))' }}
        showLineNumbers={true}
        lineNumberStyle={{
          opacity: 0.3, marginRight: '1.5em', lineHeight: '1.5rem', borderRight: '1px solid #ffffff2e', paddingRight: '1.2em', minWidth: '5ch' }}
        
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});
CodeBlock.displayName = 'CodeBlock';

import ExpandableSection from '../components/ExpandableSection';
import Explanation from '../components/Explanation';
import CodeBlock from '../components/CodeBlock';
import TipBox from '../components/TipBox';
import data from '../data/cheatsheet/enums.json';

interface EnumsSectionProps {
  expanded: Record<string, boolean>;
  toggle: (id: string) => void;
}

export default function EnumsSection({ expanded, toggle }: EnumsSectionProps) {
  return (
    <ExpandableSection
      title={data.title}
      id={data.id}
      expanded={expanded}
      toggle={toggle}
    >
      <Explanation>{data.explanation}</Explanation>
      {data.codeBlocks.map((block, index) => (
        <CodeBlock key={index} title={block.title}>
          {block.code}
        </CodeBlock>
      ))}
      <TipBox>{data.tip}</TipBox>
    </ExpandableSection>
  );
}

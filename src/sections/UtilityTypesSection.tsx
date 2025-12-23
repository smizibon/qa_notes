import ExpandableSection from '../components/ExpandableSection';
import Explanation from '../components/Explanation';
import CodeBlock from '../components/CodeBlock';
import TipBox from '../components/TipBox';
import data from '../data/cheatsheet/utility-types.json';

interface UtilityTypesSectionProps {
  expanded: Record<string, boolean>;
  toggle: (id: string) => void;
}

export default function UtilityTypesSection({ expanded, toggle }: UtilityTypesSectionProps) {
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

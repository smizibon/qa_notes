import Header from '../components/Header';
import Resources from '../components/Resources';
import GettingStartedSection from '../sections/GettingStartedSection';
import BasicTypesSection from '../sections/BasicTypesSection';
import TypeInferenceSection from '../sections/TypeInferenceSection';
import FunctionsSection from '../sections/FunctionsSection';
import InterfacesSection from '../sections/InterfacesSection';
import TypeAliasesSection from '../sections/TypeAliasesSection';
import ClassesSection from '../sections/ClassesSection';
import GenericsSection from '../sections/GenericsSection';
import EnumsSection from '../sections/EnumsSection';
import TypeGuardsSection from '../sections/TypeGuardsSection';
import UtilityTypesSection from '../sections/UtilityTypesSection';
import AdvancedPatternsSection from '../sections/AdvancedPatternsSection';
import TsConfigSection from '../sections/TsConfigSection';
import CommonPatternsSection from '../sections/CommonPatternsSection';
import CommonErrorsSection from '../sections/CommonErrorsSection';
import QuickReferenceSection from '../sections/QuickReferenceSection';

interface CheatsheetProps {
  expandedSections: Record<string, boolean>;
  setExpandedSections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export default function Cheatsheet({ expandedSections, setExpandedSections }: CheatsheetProps) {
  const toggleSection = (id: string) => {
    setExpandedSections((prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] }));
  };
  
  return (
    <>
      <Header />
      
      <div className="space-y-6">
        <GettingStartedSection expanded={expandedSections} toggle={toggleSection} />
        <BasicTypesSection expanded={expandedSections} toggle={toggleSection} />
        <TypeInferenceSection expanded={expandedSections} toggle={toggleSection} />
        <FunctionsSection expanded={expandedSections} toggle={toggleSection} />
        <InterfacesSection expanded={expandedSections} toggle={toggleSection} />
        <TypeAliasesSection expanded={expandedSections} toggle={toggleSection} />
        <ClassesSection expanded={expandedSections} toggle={toggleSection} />
        <GenericsSection expanded={expandedSections} toggle={toggleSection} />
        <EnumsSection expanded={expandedSections} toggle={toggleSection} />
        <TypeGuardsSection expanded={expandedSections} toggle={toggleSection} />
        <UtilityTypesSection expanded={expandedSections} toggle={toggleSection} />
        <AdvancedPatternsSection expanded={expandedSections} toggle={toggleSection} />
        <TsConfigSection expanded={expandedSections} toggle={toggleSection} />
        <CommonPatternsSection expanded={expandedSections} toggle={toggleSection} />
        <CommonErrorsSection expanded={expandedSections} toggle={toggleSection} />
        <QuickReferenceSection expanded={expandedSections} toggle={toggleSection} />
        
        <Resources />
      </div>
    </>
  );
}

interface HtmlCompProps {
    language: string;
    children: React.ReactNode; // Use React.ReactNode for the children prop
    type: any;
    text: any;
    onChange: any;
    index: any;
}

const HtmlComp: React.FC<HtmlCompProps> = ({ language, type, text, onChange, index, children }) => {
    return (
        <div className="group flex justify-between items-start w-[85%] m-2 mb-4 rounded-lg border-2 relative">
            <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{language}</div>
            {children}
        </div>
    );
};
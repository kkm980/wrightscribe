// import React, { useState, ChangeEvent, useEffect } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// interface Input {
//     type: string;
//     value: string;
// }

// interface FormProps {
//     inputList: any; // Adjust the type of handleSubmit based on your actual implementation
//     setInputList: any;
//     inputType: any;
//     setInputType: any;

// }
// const DynamicInputForm: React.FC<FormProps> = ({ inputList, setInputList, inputType, setInputType }) => {

//     const handleAddInput = (): void => {
//         setInputList((prevInputList: any) => [...prevInputList, { type: inputType, value: '' }]);
//     };

//     const handleInputChange = (index: number, value: string): void => {
//         setInputList((prevInputList: any) => {
//             const updatedInputs = [...prevInputList];
//             updatedInputs[index].value = value;
//             return updatedInputs;
//         });
//     };

//     const handleInputTypeChange = (event: ChangeEvent<HTMLSelectElement>): void => {
//         setInputType(event.target.value);
//     };

//     const grid = 8;

//   const reorder = (list:any, startIndex:any, endIndex:any) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//     return result;
//   };

//   const onDragEnd = (result:any) => {
//     if (!result.destination) {
//       return;
//     }

//     if (result.destination.index === result.source.index) {
//       return;
//     }

//     const updatedList = reorder(
//       inputList,
//       result.source.index,
//       result.destination.index
//     );

//     setInputList(updatedList);
//   };

//   const InputItem = (props: any) => {
//     const { input, index } = props;
  
//     return (
//       <Draggable draggableId={`input-${index}`} index={index}>
//         {(provided) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             style={{
//               border: '1px solid grey',
//               margin: `${grid}px 0`,
//               padding: `${grid}px`,
//               backgroundColor: 'lightblue',
//             }}
//           >
//             {input.value}
//             {input.type}
//           </div>
//         )}
//       </Draggable>
//     );
//   };
  

//   const InputList = () => (
//     <Droppable droppableId="inputList">
//       {(provided) => (
//         <div ref={provided.innerRef} {...provided.droppableProps}>
//           {inputList.map((input:any, index:any) => (
//             <InputItem key={index} {...{input, index}} />
//           ))}
//           {provided.placeholder}
//         </div>
//       )}
//     </Droppable>
//   );

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <InputList />
//     </DragDropContext>
//   );
// };

// export default DynamicInputForm;







import React, { useEffect } from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import Droppable from "./Dropper";
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { Settings } from 'lucide-react';
import InputEditor from './InputEditor';
import InputDeleter from './InputDeleter';
import { BookCopy } from 'lucide-react';
import InputFile from './ImageUploader';
import { Input } from '@/types/inputListTypes';

interface DynamicInputFormProps {
  inputList: Input[];
  setInputList: React.Dispatch<React.SetStateAction<Input[]>>;
  inputType: string;
  setInputType: React.Dispatch<React.SetStateAction<string>>;
}

const DynamicInputForm: React.FC<DynamicInputFormProps> = ({ inputList, setInputList, inputType, setInputType }) => {

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(inputList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setInputList(items);
  }

      const handleInputChange = (index: number, value: string): void => {
        setInputList((prevInputList: any) => {
            const updatedInputs = [...prevInputList];
            updatedInputs[index].value = value;
            return updatedInputs;
        });
    };

  return (
    <div className="w-[100%]">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {inputList.map((el: Input, index: number) => (
                  <Draggable key={el.id} draggableId={el.id} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {
                          el.type==="text"?
                          <div className="group flex justify-between items-start w-[65%] m-2 rounded-lg border-2">
                          <Textarea placeholder="Type your message here." 
                            value={el.text}
                            className='border-1 m-2 w-[65%]'
                            onChange={(e)=>{handleInputChange(index, e.target.value)}}
                          />
                          <div className='hidden group-hover:block cursor-pointer'>
                            <Button variant="ghost"
                              onClick={()=>{
                                setInputList((prevInputList: any) => {
                                  const updatedInputs = [...prevInputList];
                                  updatedInputs.push({...el, id:`${Math.random()}`});
                                  return updatedInputs;
                              });
                              }}
                            >
                              <BookCopy/>
                            </Button>
                            <InputEditor {...{setInputList, inputList, el, index}}/>
                            <InputDeleter {...{setInputList, inputList, el, index}}/>
                          </div>
                          
                        </div>
                        : el.type === "file" ?
                        <div className="group flex justify-between items-start w-[65%] m-2 rounded-lg border-2">
                        <InputFile
                          // value={el.value}
                          // className='border-1 m-2 w-[65%]'
                          // onChange={(e)=>{handleInputChange(index, e.target.value)}}
                        />
                        <div className='hidden group-hover:block cursor-pointer'>
                          <Button variant="ghost"
                            onClick={()=>{
                              setInputList((prevInputList: any) => {
                                const updatedInputs = [...prevInputList];
                                updatedInputs.push({...el, id:`${Math.random()}`});
                                return updatedInputs;
                            });
                            }}
                          >
                            <BookCopy/>
                          </Button>
                          <InputEditor {...{setInputList, inputList, el, index}}/>
                          <InputDeleter {...{setInputList, inputList, el, index}}/>
                        </div>
                        
                      </div>:
                        <></>
                        }
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
    </div>
  );
};

export default DynamicInputForm;

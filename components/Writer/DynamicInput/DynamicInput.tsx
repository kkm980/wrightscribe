import React from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import Droppable from "./Dropper";
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import InputEditor from './InputEditor';
import InputDeleter from './InputDeleter';
import { BookCopy } from 'lucide-react';
import InputFile from './ImageUploader';
import { Input } from '@/types/inputListTypes';
import { Input as InputBox } from "@/components/ui/input"

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

  const handleInputChange = (index: number, sp: any): void => {
    setInputList((prevInputList: any) => {
      const updatedInputs = [...prevInputList];
      updatedInputs[index][sp.name] = sp.value;
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
                        el.type === "text" ?
                          <div className="group flex justify-between items-start w-[65%] m-2 mb-4 rounded-lg border-2 relative">
                            <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{index+1} Text</div>
                            <Textarea placeholder="Type your message here."
                              value={el.text}
                              name="text"
                              className='border-1 m-2 w-[65%] mt-3'
                              onChange={(e) => { handleInputChange(index, e.target) }}
                            />
                            {/* <div className='absolute text-sm -top-3 right-2'>Text-area</div> */}
                            <div className='hidden group-hover:block cursor-pointer'>
                              <Button variant="ghost"
                                onClick={() => {
                                  setInputList((prevInputList: any) => {
                                    const updatedInputs = [...prevInputList];
                                    updatedInputs.push({ ...el, id: `${Math.random()}` });
                                    return updatedInputs;
                                  });
                                }}
                              >
                                <BookCopy />
                              </Button>
                              <InputEditor {...{ setInputList, inputList, el, index }} />
                              <InputDeleter {...{ setInputList, inputList, el, index }} />
                            </div>

                          </div>
                            : el.type === "image" ?
                            <div className="group flex justify-between items-start w-[65%] m-2 mb-4 rounded-lg border-2 relative">
                              <div>
                                <InputFile
                              // value={el.value}
                              // className='border-1 m-2 w-[65%]'
                              // onChange={(e)=>{handleInputChange(index, e.target.value)}}
                            /> 
                            <InputBox placeholder="Type subtitle text here"
                                value={el.text}
                                className='border-1 m-2 w-[65%]'
                                name='text'
                                onChange={(e) => { handleInputChange(index, e.target) }}
                              />
                              </div>
                            
                           
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
                          :
                          el.type === "link" ?
                            <div className="group flex justify-between items-start w-[65%] m-2 mb-4 rounded-lg border-2 relative">
                              <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{index+1} Link</div>
                                <div className='w-[70%]'>
                                 <InputBox placeholder="Type link here"
                                value={el.href}
                                className='border-1 m-2 w-[65%]'
                                name='href'
                                onChange={(e) => { handleInputChange(index, e.target) }}
                              />
                              <InputBox placeholder="Type text here"
                                value={el.text}
                                className='border-1 m-2 w-[65%]'
                                name='text'
                                onChange={(e) => { handleInputChange(index, e.target) }}
                              />
                                </div>
                             
                              <div className='hidden group-hover:block cursor-pointer'>
                                <Button variant="ghost"
                                  onClick={() => {
                                    setInputList((prevInputList: any) => {
                                      const updatedInputs = [...prevInputList];
                                      updatedInputs.push({ ...el, id: `${Math.random()}` });
                                      return updatedInputs;
                                    });
                                  }}
                                >
                                  <BookCopy />
                                </Button>
                                <InputEditor {...{ setInputList, inputList, el, index }} />
                                <InputDeleter {...{ setInputList, inputList, el, index }} />
                              </div>
                            </div>
                            :
                            el.type === "quote" ?
                            <div className="group flex justify-between items-start w-[65%] m-2 mb-4 rounded-lg border-2 relative">
                              <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{index+1} Quote</div>
                              <InputBox placeholder="Type Quote here"
                                value={el.text}
                                className='border-1 m-2 w-[65%]'
                                name='text'
                                onChange={(e) => { handleInputChange(index, e.target) }}
                              />
                              <div className='hidden group-hover:block cursor-pointer'>
                                <Button variant="ghost"
                                  onClick={() => {
                                    setInputList((prevInputList: any) => {
                                      const updatedInputs = [...prevInputList];
                                      updatedInputs.push({ ...el, id: `${Math.random()}` });
                                      return updatedInputs;
                                    });
                                  }}
                                >
                                  <BookCopy />
                                </Button>
                                <InputEditor {...{ setInputList, inputList, el, index }} />
                                <InputDeleter {...{ setInputList, inputList, el, index }} />
                              </div>
                            </div>
                            :
                            
                            null
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

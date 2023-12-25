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
  multiLangInputList: any;
  setInputList: React.Dispatch<React.SetStateAction<Input[]>>;
  inputType: string;
  setInputType: React.Dispatch<React.SetStateAction<string>>;
}

const DynamicInputForm: React.FC<DynamicInputFormProps> = ({ multiLangInputList, inputList, setInputList, inputType, setInputType }) => {

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
      {
        multiLangInputList.length === 0 ?
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
                                <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{index + 1} Text</div>
                                <Textarea placeholder="Type your message here."
                                  value={el.text}
                                  name="text"
                                  className='border-1 m-2 w-[65%] mt-3'
                                  onChange={(e) => { handleInputChange(index, e.target) }}
                                />
                                {/* <div className='absolute text-sm -top-3 right-2'>Text-area</div> */}
                                <div className='hidden group-hover:block cursor-pointer'>
                                  <Button variant="ghost"
                                    className='p-1'
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
                                el.type === "link" ?
                                  <div className="group flex justify-between items-start w-[65%] m-2 mb-4 rounded-lg border-2 relative">
                                    <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{index + 1} Link</div>
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
                                      <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{index + 1} Quote</div>
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
                                    el.type === "space" ?
                                      <div className="group flex justify-between items-start w-[65%] m-2 mb-4 h-[40px] rounded-lg border-2 relative">
                                        <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{index + 1} Space</div>
                                        <div
                                          className='border-1 m-2 w-[65%]'
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
          :
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                  {multiLangInputList.map((e: any, ind: number) => (
                    <Draggable key={e.id} draggableId={e.id} index={ind}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                          className='w-[95%] border-2 rounded mb-4 pt-5 group relative flex justify-between items-start'>
                          <div className='w-[100%]'>
                            {<div className='absolute -top-4 left-4'>{ind + 1}{" "}{e.type}</div>}
                            {e.multiLangText.map((el: any, index: number) => {
                              let renderedElement = null;

                              if (el.type === "text") {
                                renderedElement = (
                                  <div className="group flex justify-between items-start w-[85%] m-2 mb-4 rounded-lg border-2 relative">
                                    <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{el.language}</div>
                                    <Textarea placeholder="Type your message here."
                                      value={el.text}
                                      name="text"
                                      className='border-1 m-2 w-[65%] mt-3'
                                      onChange={(e) => { handleInputChange(index, e.target) }}
                                    />
                                  </div>
                                );
                              } else if (el.type === "image") {
                                renderedElement = (
                                  <div className="group flex justify-between items-start w-[85%] m-2 mb-4 rounded-lg border-2 relative">
                                    <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{el.language}</div>
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
                                  </div>
                                );
                              } else if (el.type === "link") {
                                renderedElement = (
                                  <div className="group flex justify-between items-start w-[85%] m-2 mb-4 rounded-lg border-2 relative">
                                    <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{el.language}</div>
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
                                  </div>
                                );
                              } else if (el.type === "quote") {
                                renderedElement = (
                                  <div className="group flex justify-between items-start w-[85%] m-2 mb-4 rounded-lg border-2 relative">
                                    <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{el.language}</div>
                                    <InputBox placeholder="Type Quote here"
                                      value={el.text}
                                      className='border-1 m-2 w-[65%]'
                                      name='text'
                                      onChange={(e) => { handleInputChange(index, e.target) }}
                                    />
                                  </div>
                                );
                              }
                              else if (el.type === "space") {
                                renderedElement = (
                                  <div className="group flex justify-between items-start w-[85%] m-2 mb-4 h-[40px] rounded-lg border-2 relative">
                                    <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{el.language}</div>
                                    <div
                                      className='border-1 m-2 w-[65%]'
                                    />
                                  </div>
                                );
                              }
                              return (
                                <React.Fragment key={index}>
                                  {renderedElement}
                                </React.Fragment>
                              );
                            })}
                          </div>

                          <div className='w-[120px] cursor-pointer sticky top-[300px] border border-[red]'>
                            <Button variant="ghost"
                            className='p-1'
                              onClick={() => {
                                setInputList((prevInputList: any) => {
                                  const updatedInputs = [...prevInputList];
                                  updatedInputs.push({ ...e, id: `${Math.random()}` });
                                  return updatedInputs;
                                });
                              }}
                            >
                              <BookCopy />
                            </Button>
                            <InputEditor {...{ setInputList, inputList, el: e, index: ind }} />
                            <InputDeleter {...{ setInputList, inputList, el: e, index: ind }} />
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>

      }

    </div>
  );
};

export default DynamicInputForm;

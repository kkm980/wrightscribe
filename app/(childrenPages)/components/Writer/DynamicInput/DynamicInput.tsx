import React, { useEffect } from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import Droppable from "./Dropper";
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import InputEditor from './InputEditor';
import InputDeleter from './InputDeleter';
import { BookCopy } from 'lucide-react';
import InputFile from './ImageUploader';
import { Input } from '@/types/inputListTypes';
import { Input as InputBox } from "@/components/ui/input";
import { useTheme } from 'next-themes';
import CSDPanel from './CSDPanel';

interface DynamicInputFormProps {
  multiLangInputList: any;
  setMultiLangInputList: any;
  multiLang: any;
}

const DynamicInputForm: React.FC<DynamicInputFormProps> = ({ multiLangInputList, setMultiLangInputList, multiLang }) => {

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(multiLangInputList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setMultiLangInputList(items);
  }
  
  const handleMultiLangInputChange = (
    parentIndex: number,
    index: number,
    textValue: any,
  ) => {
    setMultiLangInputList((prevArr: any) => {
      // Create a copy of the original array
      const newArr: any = [...prevArr];
      const newkey = textValue.name;
      const newVal: any = textValue.value;
      // Get the object at the specified parentIndex
      const parentObj: any = newArr[parentIndex];
      // Check if the language is 'english'
      if (parentObj.multiLangText[index].language === 'english') {
        // If the language is 'english', update the text in the parent object
        parentObj[textValue.name] = textValue.value;
        // Update the text in all objects with 'english' language in multiLangText
        parentObj.multiLangText = parentObj.multiLangText.map((langObj: any) => ({
          ...langObj,
          [newkey]: langObj.language === "english" ? newVal : langObj[newkey],
        }));

      } else {
        // If the language is not 'english', only update the text in the specified object
        parentObj.multiLangText[index][newkey] = newVal;
      }
      newArr[parentIndex] = parentObj;
      return newArr;
    });
  };
  const { theme, setTheme } = useTheme();
  return (
    <div className="w-[100%]">
      {
        !multiLang ?
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                  {multiLangInputList?.map((elem: any, ind: number) => (
                    <Draggable key={elem.id} draggableId={elem.id} index={ind}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                          className='group w-[95%] relative flex justify-between items-start'>
                          <div className='w-[100%]'>
                            {elem?.multiLangText
                              ?.filter((el: any) => el.language === 'english')
                              .map((el: any, index: number) => {
                                let renderedElement = null;

                                if (el.type === "text") {
                                  renderedElement = (
                                    <div className={`group flex justify-between items-start w-[85%] m-2 rounded-lg border-2 relative`}>
                                      <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{ind + 1}{" "}{el.type}</div>
                                      <Textarea placeholder="Type your message here."
                                        value={el.text}
                                        name="text"
                                        className='border-1 m-2 w-[65%] mt-3'
                                        onChange={(e) => { handleMultiLangInputChange(ind, index, e.target) }}
                                      />
                                      <CSDPanel {...{ setMultiLangInputList, multiLangInputList,parentDataObj:elem, el, index }} />
                                    </div>
                                  );
                                } else if (el.type === "image") {
                                  renderedElement = (
                                    <div className={`group flex justify-between items-start w-[85%] m-2 rounded-lg border-2 relative`}>
                                      <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{ind + 1}{" "}{el.type}</div>
                                      <div>
                                        <InputFile
                                        // value={el.value}
                                        // className='border-1 m-2 w-[65%]'
                                        // onChange={(e)=>{handleMultiLangInputChange(ind, index, e.target.value)}}
                                        />
                                        <InputBox placeholder="Type subtitle text here"
                                          value={el.text}
                                          className='border-1 m-2 w-[65%]'
                                          name='text'
                                          onChange={(e) => { handleMultiLangInputChange(ind, index, e.target) }}
                                        />
                                      </div>
                                      <CSDPanel {...{ setMultiLangInputList, multiLangInputList,parentDataObj:elem, el, index }} />
                                    </div>
                                  );
                                } else if (el.type === "link") {
                                  renderedElement = (
                                    <div className={`group flex justify-between items-start w-[85%] m-2 rounded-lg border-2 relative`}>
                                      <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{ind + 1}{" "}{el.type}</div>
                                      <div className='w-[70%]'>
                                        <InputBox placeholder="Type link here"
                                          value={el.href}
                                          className='border-1 m-2 w-[65%]'
                                          name='href'
                                          onChange={(e) => { handleMultiLangInputChange(ind, index, e.target) }}
                                        />
                                        <InputBox placeholder="Type text here"
                                          value={el.text}
                                          className='border-1 m-2 w-[65%]'
                                          name='text'
                                          onChange={(e) => { handleMultiLangInputChange(ind, index, e.target) }}
                                        />
                                      </div>
                                      <CSDPanel {...{ setMultiLangInputList, multiLangInputList,parentDataObj:elem, el, index }} />
                                    </div>
                                  );
                                } else if (el.type === "quote") {
                                  renderedElement = (
                                    <div className={`group flex justify-between items-start w-[85%] m-2 rounded-lg border-2 relative`}>
                                      <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{ind + 1}{" "}{el.type}</div>
                                      <InputBox placeholder="Type Quote here"
                                        value={el.text}
                                        className='border-1 m-2 w-[65%]'
                                        name='text'
                                        onChange={(e) => { handleMultiLangInputChange(ind, index, e.target) }}
                                      />
                                      <CSDPanel {...{ setMultiLangInputList, multiLangInputList,parentDataObj:elem, el, index }} />
                                    </div>
                                  );
                                }
                                else if (el.type === "space") {
                                  renderedElement = (
                                    <div className={`group flex justify-between items-start w-[85%] m-2 rounded-lg border-2 relative`}>
                                      <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{ind + 1}{" "}{el.type}</div>
                                      <div
                                        className='border-1 m-2 w-[65%]'
                                      />
                                      <CSDPanel {...{ setMultiLangInputList, multiLangInputList,parentDataObj:elem, el, index }} />
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
                          className='w-[95%] border-2 rounded mb-4 pt-5 relative flex justify-between items-start'>
                          <div className='w-[100%]'>
                            {<div className='absolute -top-4 left-4'>{ind + 1}{" "}{e.type}</div>}
                            {e.multiLangText.map((el: any, index: number) => {
                              let renderedElement = null;
                              if(el.show==false){renderedElement=(<></>)}
                              else if (el.type === "text") {
                                renderedElement = (
                                  <div className={`group flex justify-between items-start w-[85%] m-2 mb-4 rounded-lg border-2 relative`}>
                                    <div className='absolute text-sm -top-3 left-2 hidden group-hover:block'>{el.language}</div>
                                    <Textarea placeholder="Type your message here."
                                      value={el.text}
                                      name="text"
                                      className='border-1 m-2 w-[65%] mt-3'
                                      onChange={(e) => { handleMultiLangInputChange(ind, index, e.target) }}
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
                                      // onChange={(e)=>{handleMultiLangInputChange(ind, index, e.target.value)}}
                                      />
                                      <InputBox placeholder="Type subtitle text here"
                                        value={el.text}
                                        className='border-1 m-2 w-[65%]'
                                        name='text'
                                        onChange={(e) => { handleMultiLangInputChange(ind, index, e.target) }}
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
                                        onChange={(e) => { handleMultiLangInputChange(ind, index, e.target) }}
                                      />
                                      <InputBox placeholder="Type text here"
                                        value={el.text}
                                        className='border-1 m-2 w-[65%]'
                                        name='text'
                                        onChange={(e) => { handleMultiLangInputChange(ind, index, e.target) }}
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
                                      onChange={(e) => { handleMultiLangInputChange(ind, index, e.target) }}
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

                          <div className='w-[120px] cursor-pointer sticky top-[50%] right-0'>
                            <Button variant="ghost"
                              className='p-1'
                              onClick={() => {
                                setMultiLangInputList((prevMultiLangInputList: any) => {
                                  const updatedInputs = [...prevMultiLangInputList];
                                  updatedInputs.push({ ...e, id: `${Math.random()}` });
                                  return updatedInputs;
                                });
                              }}
                            >
                              <BookCopy />
                            </Button>
                            <InputEditor {...{ setMultiLangInputList, multiLangInputList, el: e, index: ind }} />
                            <InputDeleter {...{ setMultiLangInputList, multiLangInputList, el: e, index: ind }} />
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

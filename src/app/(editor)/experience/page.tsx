'use client';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { Input, Label } from '@/components/common';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select';
import {
  FormCard,
  FormRemoveButton,
  MarkdownInput,
  PeriodInput,
} from '@/components/Form';
import {
  EMPLOYMENT_TYPES,
  INITIAL_VALUE,
  PERIOD_LABEL,
  PLACEHOLDER,
} from '@/constants/form';
import { MENU_INFO } from '@/constants/menu';
import { type ExperienceFormDataSchema } from '@/types/form';
import { storage } from '@/utils/storage';

const Page = () => {
  const {
    control,
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<ExperienceFormDataSchema>();

  const { fields, append, remove } = useFieldArray({
    name: 'experiences',
    control,
  });

  const handleAppendClick = () => {
    append({
      ...INITIAL_VALUE.EXPERIENCE,
      id: v4(),
    });
  };

  const handleRemoveClick = (index: number) => {
    remove(index);

    storage.set({
      ...storage.get(),
      experiences: getValues('experiences'),
    });
  };

  const handleSaveClick = () => {
    trigger('experiences');

    if (errors.experiences) {
      return;
    }

    storage.set({ ...storage.get(), experiences: getValues('experiences') });
  };

  return (
    <FormCard
      title={MENU_INFO.EXPERIENCE.TITLE}
      guide={MENU_INFO.EXPERIENCE.GUIDE}
      onAppendForm={handleAppendClick}
      onSaveForm={handleSaveClick}
    >
      <ul>
        {fields.map((item, index) => (
          <li key={item.id} className="border-b border-gray-200/70 py-6">
            <div className="mb-3 flex items-end gap-2">
              <Input
                {...register(`experiences.${index}.company`)}
                id="title"
                className="mr-1"
                label={{ text: '회사명', isRequired: true }}
                placeholder={PLACEHOLDER.EXPERIENCE.COMPANY}
                error={errors.experiences?.[index]?.company?.message}
                autoFocus
              />
              <FormRemoveButton onRemoveForm={() => handleRemoveClick(index)} />
            </div>
            <div className="mb-3 flex flex-col gap-3 md:flex-row md:gap-2">
              <div className="flex-1">
                <Label htmlFor="employmentType" isRequired>
                  근무 형태
                </Label>
                <Controller
                  control={control}
                  name={`experiences.${index}.employmentType`}
                  render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} defaultValue={value}>
                      <SelectTrigger
                        error={
                          errors.experiences?.[index]?.employmentType?.message
                        }
                      >
                        <SelectValue placeholder="근무 형태" />
                      </SelectTrigger>
                      <SelectContent>
                        {EMPLOYMENT_TYPES.map((employmentType) => (
                          <SelectItem
                            key={employmentType}
                            value={employmentType}
                          >
                            {employmentType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex-1">
                <Input
                  {...register(`experiences.${index}.jobTitle`)}
                  id="jobTitle"
                  label={{ text: '직무', isRequired: true }}
                  placeholder={PLACEHOLDER.EXPERIENCE.JOB_TITLE}
                  error={errors.experiences?.[index]?.jobTitle?.message}
                />
              </div>
            </div>
            <PeriodInput
              formName="experiences"
              index={index}
              label={PERIOD_LABEL.WORKING}
              error={{
                startDate: errors.experiences?.[index]?.startDate?.message,
                endDate: errors.experiences?.[index]?.endDate?.message,
              }}
            />
            <MarkdownInput
              formName="experiences"
              index={index}
              label="내용"
              placeholder={PLACEHOLDER.EXPERIENCE.CONTENT}
              error={errors.experiences?.[index]?.content?.message}
            />
          </li>
        ))}
      </ul>
    </FormCard>
  );
};

export default Page;

import React, { useCallback, useId, useMemo } from "react";
import {
  SubmitHandler,
  UseFormReset,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";
import { MdClose } from "react-icons/md";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE, SubmitButton } from "shared";
import { Alert, Box, Button, IconButton, Typography } from "@mui/material";
import { sizeInMB } from "utils/helpers";

const UserGeneralInfoSchema = z.object({
  profileImages: z
    .custom<File[]>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0;
    }, "Image is required")
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
      );
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, "File type is not supported"),
});

type UserSchemaType = z.infer<typeof UserGeneralInfoSchema>;

const PhotosUploader = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserGeneralInfoSchema),
  });
  const id = useId();
  const { profileImages } = watch();

  const importedImages = useMemo(
    () => (profileImages ? Object.values(profileImages) : []),
    [profileImages]
  );

  // const onSubmit: SubmitHandler<UserSchemaType> = async (data) => {
  const onSubmit: SubmitHandler<UserSchemaType> = async () => {
    // const FilesList = data.profileImages;

    const formData = new FormData();
    for (const img of importedImages) {
      formData.append("profileImage", img);
    }
    // const response = await uploadProfileImage(formData);
    // if ([400, 500].includes(response.status)) {
    //   toast.error(response.message);
    // } else {
    //   toast.success(response.message);
    //   // revalidate("/");
    //   reset();
    // }
  };

  return (
    <fieldset>
      <legend>Update user images</legend>
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "5px 10px" }}>
        <Box sx={{ padding: "0", my: "10px" }}>
          <Box sx={{ position: "relative", width: "90%", textAlign: "left" }}>
            <label
              htmlFor={`input-files-${id}`}
              style={{ marginLeft: "5px", cursor: "pointer" }}
            >
              {`Select user photo *`}
            </label>
            <br />
            <input
              id={`input-files-${id}`}
              type="file"
              accept="image/*"
              {...register("profileImages")}
              multiple
              style={{ display: "none" }}
            />
            {errors.profileImages?.message && (
              <Alert severity="error">
                <span>{errors.profileImages?.message}</span>
              </Alert>
            )}
            <ImageCards
              importedImages={importedImages}
              reset={reset}
              setValue={setValue}
            />
          </Box>
        </Box>
        <SubmitButton
          isLoading={isSubmitting}
          loadingIndicator={<BeatLoader color="#36d7b7" size={10} />}
          variant="contained"
          label="Save"
        />
      </form>
    </fieldset>
  );
};

export const ImageCards = ({
  importedImages,
  reset,
  setValue,
}: {
  importedImages: Array<File>;
  reset: UseFormReset<{
    profileImages: File[];
  }>;
  setValue: UseFormSetValue<{
    profileImages: File[];
  }>;
}) => {
  const handleRemoveImage = useCallback(
    (imageName: string) => {
      const imageList = [...importedImages].filter(
        (img) => img.name !== imageName
      );
      setValue("profileImages", imageList);
    },
    [importedImages, setValue]
  );

  return importedImages.length > 0 ? (
    <>
      <Box sx={{ display: "flex" }}>
        {importedImages.map((img, index) => (
          <Box key={img.name} sx={{ position: "relative" }}>
            <IconButton
              onClick={() => handleRemoveImage(img.name)}
              sx={{ position: "absolute", top: "10px", right: "20px" }}
            >
              <MdClose />
            </IconButton>
            <img
              src={URL.createObjectURL(img)}
              alt={img.name}
              style={{
                height: "150px",
                aspectRatio: "auto",
                margin: "0px 8px",
              }}
            />
          </Box>
        ))}
      </Box>
      <Button onClick={() => reset()}>
        <MdClose />
        <Typography>Remove all photos</Typography>
      </Button>
    </>
  ) : null;
};

export default PhotosUploader;
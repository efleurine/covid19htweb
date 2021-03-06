import React, { useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormHelperText,
  Textarea,
  useToast,
} from "@chakra-ui/core";
import useSWR from "swr";
import { useForm } from "react-hook-form";

import { FullDiv } from "components/brics";
import { TOAST_ERROR, TOAST_SUCCESS } from "utils/misc-helpers";
import fetch from "utils/fetch";
import { Section, Content } from "../common/section";
import { ProfileAvatar } from "./avatar";

export const PublicProfileView = () => {
  const { data: user } = useSWR("userState", { initialData: {} });

  const {
    handleSubmit,
    errors,
    register,
    unregister,
    getValues,
    setValue,
    formState,
  } = useForm({
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      signature: user.signature || "",
      pictureUrl: user.pictureUrl || "/images/foto.png",
    },
  });
  const toast = useToast();

  useEffect(() => {
    register({ name: "pictureUrl" });

    return () => unregister("pictureUrl"); // unregister input after component unmount
  }, [register]);

  // const [failed, setFailed] = useState("");

  function onSubmit(values) {
    fetch("/api/user/me", {
      method: "PATCH",
      body: JSON.stringify({
        data: { ...values },
        action: "updateProfile",
      }),
    })
      .then(() => {
        toast(TOAST_SUCCESS);
      })
      .catch(() => {
        toast(TOAST_ERROR);
      });
  }

  return (
    <Section name="Profil piblik">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Content label="Foto">
          <Box>TO BE IMPLEMENTED</Box>
        </Content> */}
        <ProfileAvatar
          current={getValues().pictureUrl}
          onChange={(picUrl) => {
            setValue("pictureUrl", picUrl);
          }}
        />
        <Content label="Prenon" labelWidth={80}>
          <FullDiv>
            <Input
              name="firstName"
              aria-describedby="firstName-helper-text"
              ref={register()}
            />
            <FormHelperText id="email-helper-text">Non pa ou.</FormHelperText>
          </FullDiv>
        </Content>
        <Content label="Non" labelWidth={80}>
          <FullDiv>
            <Input
              name="lastName"
              aria-describedby="lastName-helper-text"
              ref={register()}
            />
            <FormHelperText id="email-helper-text">
              Non fanmi ou.
            </FormHelperText>
          </FullDiv>
        </Content>
        <Content label="Siyati" labelWidth={80}>
          <FullDiv>
            <Textarea
              name="signature"
              aria-describedby="signature-helper-text"
              ref={register()}
            />

            <FormHelperText id="email-helper-text">
              Yon siyati ki ap parèt anba tèks ou pibliye.
            </FormHelperText>
          </FullDiv>
        </Content>
        <Box>
          <Content label="" labelWidth={80}>
            <Button
              type="submit"
              variantColor="green"
              isLoading={formState.isSubmitting}
              isDisabled={formState.isSubmitting}
              loadingText="Nap òpdet profil la"
            >
              Òpdet profil la.
            </Button>
          </Content>
        </Box>
      </form>
    </Section>
  );
};

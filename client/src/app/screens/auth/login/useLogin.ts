import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { userService } from '@/app/services';
import { userValidationSchema } from '@/validationSchemas';
import { storageConstants } from '@/constants';
import { ErrorResponse } from '@/interfaces';
import { localStorageUtils } from '@/app/utils';

type ILoginDTO = z.infer<typeof userValidationSchema.login>;

export default function useLoginHook() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginDTO>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(userValidationSchema.login)
  });

  const { mutate: login, isLoading } = useMutation({
    mutationFn: userService.loginUser,
    onSuccess: ({ data: { token, ...currentUser } }) => {
      localStorageUtils.setItem(storageConstants.sessionKey, token);
      localStorageUtils.setItem(
        storageConstants.localUserKey,
        JSON.stringify(currentUser)
      );
      navigate('/');
    },
    onError: (error: ErrorResponse) => {
      alert(error?.error.message);
    }
  });

  const onSubmit = ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    login({ email, password });
  };

  const textInput_invalid = {
    border: '1px solid tomato'
  };

  return {
    Controller,
    textInput_invalid,
    control,
    handleSubmit,
    errors,
    isLoading,
    onSubmit
  };
}

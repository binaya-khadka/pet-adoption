import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { userService } from '@/app/services';
import { storageConstants } from '@/constants';
import { localStorageUtils } from '@/app/utils';
import { userValidationSchema } from '@/validationSchemas';

type ISignupDTO = z.infer<typeof userValidationSchema.signup>;

export default function useSignupHook() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignupDTO>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(userValidationSchema.signup)
  });

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: userService.signUpUser,
    onSuccess: ({ data: { token, ...currentUser } }) => {
      localStorageUtils.setItem(storageConstants.sessionKey, token);
      localStorageUtils.setItem(
        storageConstants.localUserKey,
        JSON.stringify(currentUser)
      );
      navigate('/');
    }
  });

  const onSubmit = ({
    name,
    email,
    password
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    signup({ name, email, password });
  };

  return {
    handleSubmit,
    Controller,
    control,
    errors,
    onSubmit,
    isLoading
  };
}

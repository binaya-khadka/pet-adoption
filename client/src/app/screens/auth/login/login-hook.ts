import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { userService } from '../../../services';
import { localStorageUtils } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { storageConstants } from '../../../../constants';
import { ErrorResponse } from '../../../../interfaces';
import { useForm, Controller } from 'react-hook-form';
import { userValidationSchema } from '../../../../validationSchemas';
import { z } from 'zod';

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
      console.log(error?.error?.message);
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

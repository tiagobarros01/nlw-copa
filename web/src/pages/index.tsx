import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import { FormEvent, FunctionComponent, useState } from 'react';

import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import avatarExampleImg from '../assets/avatars-example.png';
import logoImg from '../assets/logo.svg';
import iconCheckImg from '../assets/icon-check.svg';
import { api } from '../services/axios';

type HomeProps = {
  poolCount: number;
  guessCount: number;
  userCount: number;
};

const Home: FunctionComponent<HomeProps> = (props) => {
  const { poolCount, guessCount, userCount } = props;

  const [input, setInput] = useState('');

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const { data } = await api.post('pools', {
        title: input,
      });

      await navigator.clipboard.writeText(data.uniqueCode)

      alert('Bolão criado com sucesso! O código foi copiado para a área de transferência.');

      setInput('')
    } catch (err) {
      alert('Falha ao criar o bolão, tente novamente.');

      console.log(err);
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logoImg} alt="NLW Copa" quality={100} />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={avatarExampleImg} alt="" quality={100} />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{userCount}</span> pessoas já
            estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2" action="">
          <input
            required
            value={input}
            onChange={(event) => setInput(event.target.value)}
            type="text"
            placeholder="Qual nome do seu bolão?"
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded uppercase text-gray-900 font-bold text-sm hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <section className="mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </section>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
        quality={100}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const [poolsData, guessData, userData] = await Promise.all([
    api.get<{ count: number }>('/pools/count'),
    api.get<{ count: number }>('/guesses/count'),
    api.get<{ count: number }>('/users/count'),
  ]);

  return {
    props: {
      poolCount: poolsData.data.count,
      guessCount: guessData.data.count,
      userCount: userData.data.count,
    },
  };
};

export default Home;

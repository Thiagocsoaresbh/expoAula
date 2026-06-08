// Importa o componente Tabs do Expo Router
// Tabs é responsável por criar a barra de navegação inferior com abas
import { Tabs } from 'expo-router';

// Importa o React — necessário sempre que usamos JSX (a sintaxe parecida com HTML)
import React from 'react';

// Importa o HapticTab: versão customizada do botão de aba que adiciona vibração ao toque
import { HapticTab } from '@/components/haptic-tab';

// Importa o IconSymbol: componente que exibe ícones do sistema (SF Symbols no iOS)
import { IconSymbol } from '@/components/ui/icon-symbol';

// Importa as cores definidas no tema do app (claro e escuro)
import { Colors } from '@/constants/theme';

// Hook que detecta se o celular está no modo claro ou escuro
import { useColorScheme } from '@/hooks/use-color-scheme';

// Componente que define o layout das abas (tabs) do app
export default function TabLayout() {

  // Detecta o tema atual do dispositivo: 'light' (claro) ou 'dark' (escuro)
  const colorScheme = useColorScheme();

  return (
    // Tabs é o container que cria a navegação por abas na parte inferior da tela
    <Tabs
      screenOptions={{
        // Define a cor do ícone da aba ativa com base no tema do dispositivo
        // O "?? 'light'" garante que use o tema claro se não conseguir detectar
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,

        // Remove o cabeçalho (header) padrão de cada tela
        headerShown: false,

        // Substitui o botão padrão da aba pelo HapticTab (com vibração ao toque)
        tabBarButton: HapticTab,
      }}
    >

      {/* Aba "Home" — aponta para o arquivo app/(tabs)/index.tsx */}
      <Tabs.Screen
        name="index"  // nome do arquivo da tela (sem extensão)
        options={{
          title: 'Home',  // texto que aparece embaixo do ícone na aba
          tabBarIcon: ({ color }) => (
            // Ícone de casa — "color" muda automaticamente conforme a aba está ativa ou não
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* Aba "Prática" — aponta para o arquivo app/(tabs)/explore.tsx */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Prática',
          tabBarIcon: ({ color }) => (
            // Ícone de avião de papel
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />

      {/* Aba "Usuários" — aponta para o arquivo app/(tabs)/usuarios.tsx */}
      <Tabs.Screen
        name="usuarios"
        options={{
          title: 'Usuários',
          tabBarIcon: ({ color }) => (
            // Ícone de grupo de pessoas
            <IconSymbol size={28} name="person.3.fill" color={color} />
          ),
        }}
      />

      {/* Aba "Produtos" — aponta para o arquivo app/(tabs)/produtos.tsx
          Essa aba é o ponto de entrada do módulo de Persistência de Dados
          A tela de cadastro (novoProduto.tsx) é acessada por navegação de pilha */}
      <Tabs.Screen
        name="produtos"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color }) => (
            // Ícone de caixa/arquivo — representa produtos cadastrados
            <IconSymbol size={28} name="archivebox.fill" color={color} />
          ),
        }}
      />

    </Tabs>
  );
}

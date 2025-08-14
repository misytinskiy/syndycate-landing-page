"use client";
import { useLayoutEffect, useRef } from "react";

// Глобальная переменная для хранения фиксированной зоны между рендерами
let globalFixedZone = null;
// Глобальные переменные для хранения зафиксированных размеров контейнера
let globalContainerWidth = null;
let globalContainerHeight = null;

/**
 * Простой и надёжный хук для плавающих градиентных пузырей
 * Абсолютно изолированная зона полёта на основе начальных размеров
 */
export function useFloatingBlobs(containerRef, itemRefs, options = {}) {
  const opts = {
    speedRange: options.speedRange || [5, 7],
    scaleRange: options.scaleRange || [1.01, 1.06],
    rotateRange: options.rotateRange || [-4, 4],
    fixedZone: options.fixedZone || false, // фиксированная зона полёта
  };

  const animationRefs = useRef(new Map()); // храним ссылки на анимации
  const fixedZoneRef = useRef(null); // ссылка на зафиксированную зону

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = itemRefs.map((r) => r?.current).filter(Boolean);
    if (!items.length) return;

    console.log("🔄 useFloatingBlobs: Инициализация/пересоздание градиента");
    console.log("📍 Контейнер:", container);
    console.log("🎯 Элементы:", items);

    // Создаём абсолютно изолированную зону полёта
    if (opts.fixedZone && !globalFixedZone) {
      const containerRect = container.getBoundingClientRect();
      console.log("🏗️ Создаём фиксированную зону полёта:", containerRect);

      // Создаём невидимый элемент-зону с фиксированными размерами
      const flightZone = document.createElement("div");
      flightZone.style.cssText = `
        position: absolute;
        top: ${containerRect.top}px;
        left: ${containerRect.left}px;
        width: ${containerRect.width}px;
        height: ${containerRect.height}px;
        pointer-events: none;
        z-index: -1;
        opacity: 0;
      `;

      // Добавляем зону в body чтобы она не зависела от изменений контейнера
      document.body.appendChild(flightZone);
      globalFixedZone = flightZone;
      fixedZoneRef.current = flightZone;
      console.log("✅ Фиксированная зона создана:", flightZone);
    } else if (opts.fixedZone && globalFixedZone) {
      console.log("🔄 Используем существующую глобальную фиксированную зону");
      fixedZoneRef.current = globalFixedZone;
    }

    // Используем фиксированную зону или контейнер
    const flightContainer = opts.fixedZone ? fixedZoneRef.current : container;
    const containerRect = flightContainer.getBoundingClientRect();

    // Для фиксированной зоны используем зафиксированные размеры контейнера
    let containerWidth, containerHeight;

    if (opts.fixedZone) {
      // Фиксируем размеры при первом вызове
      if (globalContainerWidth === null || globalContainerHeight === null) {
        globalContainerWidth = container.offsetWidth;
        globalContainerHeight = container.offsetHeight;
        console.log("📏 Фиксируем размеры контейнера:", {
          width: globalContainerWidth,
          height: globalContainerHeight,
        });
      }
      containerWidth = globalContainerWidth;
      containerHeight = globalContainerHeight;
    } else {
      containerWidth = containerRect.width;
      containerHeight = containerRect.height;
    }

    console.log("📏 Размеры для градиента:", {
      containerWidth,
      containerHeight,
      isFixedZone: opts.fixedZone,
      containerOffsetWidth: container.offsetWidth,
      containerOffsetHeight: container.offsetHeight,
    });

    // Функция для генерации случайного числа в диапазоне
    const random = (min, max) => Math.random() * (max - min) + min;

    // Функция для создания анимации движения
    const createMovementAnimation = (element) => {
      const elementRect = element.getBoundingClientRect();
      const maxX = Math.max(0, containerWidth - elementRect.width);
      const maxY = Math.max(0, containerHeight - elementRect.height);

      // Случайная конечная позиция
      const targetX = random(0, maxX);
      const targetY = random(0, maxY);

      // Случайная длительность
      const duration = random(opts.speedRange[0], opts.speedRange[1]);

      let animation;

      if (opts.fixedZone) {
        // Для фиксированной зоны используем top/left относительно контейнера
        const currentTop = parseFloat(element.style.top) || 0;
        const currentLeft = parseFloat(element.style.left) || 0;

        const keyframes = [
          {
            top: `${currentTop}px`,
            left: `${currentLeft}px`,
          },
          {
            top: `${targetY}px`,
            left: `${targetX}px`,
          },
        ];

        animation = element.animate(keyframes, {
          duration: duration * 1000,
          easing: "ease-in-out",
          fill: "forwards",
        });

        // Когда анимация заканчивается, создаём новую
        animation.onfinish = () => {
          // Обновляем текущую позицию элемента
          element.style.top = `${targetY}px`;
          element.style.left = `${targetX}px`;
          // Создаём следующую анимацию
          createMovementAnimation(element);
        };
      } else {
        // Обычный режим с transform
        const keyframes = [
          { transform: `translate(${element.style.transform || "0px, 0px"})` },
          { transform: `translate(${targetX}px, ${targetY}px)` },
        ];

        animation = element.animate(keyframes, {
          duration: duration * 1000,
          easing: "ease-in-out",
          fill: "forwards",
        });

        // Когда анимация заканчивается, создаём новую
        animation.onfinish = () => {
          // Обновляем текущую позицию элемента
          element.style.transform = `translate(${targetX}px, ${targetY}px)`;
          // Создаём следующую анимацию
          createMovementAnimation(element);
        };
      }

      return animation;
    };

    // Функция для создания анимации вращения и масштабирования
    const createRotationAnimation = (element) => {
      const targetRotate = random(opts.rotateRange[0], opts.rotateRange[1]);
      const targetScale = random(opts.scaleRange[0], opts.scaleRange[1]);

      let animation;

      if (opts.fixedZone) {
        // Для фиксированной зоны используем только rotate и scale
        const keyframes = [
          { transform: "rotate(0deg) scale(1)" },
          { transform: `rotate(${targetRotate}deg) scale(${targetScale})` },
        ];

        animation = element.animate(keyframes, {
          duration: random(5, 9) * 1000,
          easing: "ease-in-out",
          direction: "alternate",
          iterations: Infinity,
        });
      } else {
        // Обычный режим с transform
        const keyframes = [
          {
            transform: `${
              element.style.transform || "translate(0px, 0px)"
            } rotate(0deg) scale(1)`,
          },
          {
            transform: `${
              element.style.transform || "translate(0px, 0px)"
            } rotate(${targetRotate}deg) scale(${targetScale})`,
          },
        ];

        animation = element.animate(keyframes, {
          duration: random(5, 9) * 1000,
          easing: "ease-in-out",
          direction: "alternate",
          iterations: Infinity,
        });
      }

      return animation;
    };

    // Запускаем анимации для всех элементов
    items.forEach((element, index) => {
      // Устанавливаем начальную позицию относительно фиксированной зоны
      const startX = random(
        0,
        Math.max(0, containerWidth - element.offsetWidth)
      );
      const startY = random(
        0,
        Math.max(0, containerHeight - element.offsetHeight)
      );

      // Позиционируем градиент абсолютно относительно фиксированной зоны
      if (opts.fixedZone) {
        const containerRect = container.getBoundingClientRect();
        element.style.position = "absolute"; // используем absolute вместо fixed
        element.style.top = `${startY}px`; // позиция относительно контейнера
        element.style.left = `${startX}px`; // позиция относительно контейнера
        element.style.transform = "none"; // убираем transform, используем top/left
      } else {
        element.style.transform = `translate(${startX}px, ${startY}px)`;
      }

      // Запускаем анимации с небольшой задержкой для каждого элемента
      setTimeout(() => {
        const movementAnim = createMovementAnimation(element);
        const rotationAnim = createRotationAnimation(element);

        // Сохраняем ссылки на анимации
        animationRefs.current.set(element, {
          movement: movementAnim,
          rotation: rotationAnim,
        });
      }, index * 150);
    });

    // Очистка при размонтировании
    return () => {
      console.log("🗑️ useFloatingBlobs: Очистка/уничтожение градиента");
      animationRefs.current.forEach(({ movement, rotation }) => {
        movement.cancel();
        rotation.cancel();
      });
      animationRefs.current.clear();

      // НЕ удаляем глобальную фиксированную зону при перерендере
      // Она будет удалена только при полном размонтировании компонента
      console.log(
        "🔄 Сохраняем глобальную фиксированную зону для повторного использования"
      );
    };
  }, [
    containerRef,
    itemRefs,
    opts.speedRange,
    opts.scaleRange,
    opts.rotateRange,
    opts.fixedZone,
  ]);

  // Возвращаем функцию для остановки анимаций (если понадобится)
  return {
    stop: () => {
      animationRefs.current.forEach(({ movement, rotation }) => {
        movement.cancel();
        rotation.cancel();
      });
      animationRefs.current.clear();
    },
    destroyGlobalZone: () => {
      if (globalFixedZone) {
        console.log("🗑️ Полное удаление глобальной фиксированной зоны");
        document.body.removeChild(globalFixedZone);
        globalFixedZone = null;
        fixedZoneRef.current = null;
      }
      // Очищаем зафиксированные размеры
      globalContainerWidth = null;
      globalContainerHeight = null;
      console.log("🗑️ Очищены зафиксированные размеры контейнера");
    },
  };
}

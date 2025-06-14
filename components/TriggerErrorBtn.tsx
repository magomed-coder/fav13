import React, { useState } from "react";
import { Button, View } from "react-native";

export function TriggerRenderError() {
  const [crash, setCrash] = useState(false);

  if (crash) {
    // Искусственно бросаем в render — попадёт в ErrorBoundary
    throw new Error("🔥 Тестовая ошибка в render");
  }

  return (
    <View style={{ padding: 20 }}>
      <Button
        title="Симулировать Render-ошибку"
        onPress={() => setCrash(true)}
      />
    </View>
  );
}

export function TriggerAsyncError() {
  const trigger = () => {
    setTimeout(() => {
      // Непойманный reject — попадёт в ErrorUtils
      Promise.reject(new Error("💥 Тестовая асинхронная ошибка"));
    }, 1000);
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Симулировать Async-ошибку" onPress={trigger} />
    </View>
  );
}

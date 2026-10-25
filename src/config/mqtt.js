import mqtt from 'mqtt';
import 'dotenv/config';

let client = null;

const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://mosquitto:1883';
const username = process.env.MQTT_USER || 'admin_tcc';
const password = process.env.MQTT_PASSWORD || 'senha_segura_tcc_2026';

const connectMQTT = () => {
    if (client) return client;

    console.log(`🔌 Conectando ao Broker MQTT em ${brokerUrl}...`);

    client = mqtt.connect(brokerUrl, {
        username,
        password,
        clientId: `backend_tcc_${Math.random().toString(16).substring(2, 8)}`,
        clean: true,
        reconnectPeriod: 5000,
        connectTimeout: 30 * 1000
    });

    client.on('connect', () => {
        console.log(`✅ MQTT Conectado ao broker Mosquitto (${brokerUrl})`);
    });

    client.on('error', (err) => {
        console.error(`❌ Erro no cliente MQTT: ${err.message}`);
    });

    client.on('reconnect', () => {
        console.log(`🔄 Tentando reconectar ao broker MQTT...`);
    });

    client.on('offline', () => {
        console.warn(`⚠️ Cliente MQTT desconectado (offline).`);
    });

    return client;
};

const getMQTTClient = () => {
    if (!client) {
        return connectMQTT();
    }
    return client;
};

/**
 * Publica uma mensagem em um tópico MQTT.
 * @param {string} topic 
 * @param {string|object} message 
 * @param {object} options 
 * @returns {Promise<void>}
 */
const publishMessage = (topic, message, options = { qos: 1, retain: false }) => {
    return new Promise((resolve, reject) => {
        const mqttClient = getMQTTClient();
        const payload = typeof message === 'object' ? JSON.stringify(message) : String(message);

        mqttClient.publish(topic, payload, options, (error) => {
            if (error) {
                console.error(`❌ Falha ao publicar em ${topic}: ${error.message}`);
                return reject(error);
            }
            resolve();
        });
    });
};

/**
 * Inscreve-se em um tópico e registra uma função de callback para mensagens recebidas.
 * @param {string} topic 
 * @param {Function} callback (topic, messageBuffer, packet)
 */
const subscribeTopic = (topic, callback) => {
    const mqttClient = getMQTTClient();

    mqttClient.subscribe(topic, { qos: 1 }, (error) => {
        if (error) {
            console.error(`❌ Erro ao assinar tópico ${topic}: ${error.message}`);
            return;
        }
        console.log(`📥 Assinado com sucesso no tópico MQTT: ${topic}`);
    });

    if (callback && typeof callback === 'function') {
        mqttClient.on('message', (receivedTopic, messageBuffer, packet) => {
            if (receivedTopic === topic || matchTopic(topic, receivedTopic)) {
                callback(receivedTopic, messageBuffer, packet);
            }
        });
    }
};

/**
 * Função utilitária para correspondência de tópicos MQTT com coringas (+ e #)
 */
const matchTopic = (filter, topic) => {
    const filterParts = filter.split('/');
    const topicParts = topic.split('/');

    for (let i = 0; i < filterParts.length; i++) {
        if (filterParts[i] === '#') return true;
        if (filterParts[i] !== '+' && filterParts[i] !== topicParts[i]) return false;
    }
    return filterParts.length === topicParts.length;
};

export {
    connectMQTT,
    getMQTTClient,
    publishMessage,
    subscribeTopic
};

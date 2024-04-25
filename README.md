# Ticketing Microservices App

A microservices-based application that allows users to purchase tickets for various events. The app employs a ticket locking mechanism where tickets are temporarily reserved for users upon selection, and if not purchased within a specified time frame, they are made available for purchase again.

## Services

### Auth Service

The Auth service is responsible for user authentication within the system. It handles user login, registration, and authentication token generation.

### Tickets Service

The Tickets service manages the creation and locking of tickets. When a user selects a ticket for purchase, it is temporarily locked for that user. If the purchase is not completed within the allotted time, the ticket is unlocked and made available for purchase again.

### Expiration Service

The Expiration service handles the expiration of ticket locks. It monitors the time duration during which a ticket is locked and ensures that if a purchase is not completed within this period, the ticket lock is released.

### Orders Service

The Orders service maintains a history of ticket orders for each user. It provides functionality to retrieve the order history of a specific user, including details such as purchased tickets and transaction timestamps.

### Payments Service

The Payments service facilitates the payment process for users. It integrates with payment gateways to allow users to securely pay for their selected tickets within the specified time frame.

## Local Deployment with Skaffold

This project utilizes Skaffold for local deployment, enabling seamless development and testing of microservices within a Kubernetes environment. Skaffold automates the build, push, and deployment processes, providing a rapid development experience.

To deploy the microservices locally using Skaffold, follow these steps:

1. Install Skaffold: [Skaffold Installation Guide](https://skaffold.dev/docs/install/)
2. Configure Kubernetes: Ensure you have a Kubernetes cluster configured locally (e.g., Minikube, Docker Desktop with Kubernetes enabled).
3. Clone the repository:

```bash
git clone https://github.com/znoelr/ticketing-microservices.git
```
4. Navigate to the project directory:
```bash
cd ticketing-microservices
```
5. Run Skaffold:
```bash
skaffold dev
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

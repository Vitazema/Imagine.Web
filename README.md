# Enhanced Image Generation with Stable Diffusion AI

This project provides an advanced platform for AI-generated images using the Stable Diffusion AI model. It features a reactive interface built with React, enabling user-specific, text-based AI image generation. The frontend is bundled with Vite and written in TypeScript, while the backend services are containerized using Docker and served via Nginx for optimal performance and scalability.

<p align="center">
  <img src="preview.png" alt="alt text" width="200">
</p>

<h1 align="center">
https://aiexpression.net/
</h1>

## Features

- **Text-based Image Generation**: Utilizes the Stable Diffusion AI for generating images based on user-provided text.
- **Reactive Interface**: Built with React for a dynamic user experience.
- **User-Specific Customization**: Allows for personalized image generation settings.
- **Modern Tech Stack**: Leveraging React, Vite, TypeScript, Docker, Nginx, and CSS with Material UI (MUI) for a robust and scalable application.

## How to Use the Image Generator

The Image Generator provides an intuitive interface for converting text prompts into images using AI technology. Follow these steps to create your own AI-generated images:

1. **Open the Application**: Navigate to the web interface of the Image Generator.

2. **Enter Your Prompt**: In the "Prompt" field at the top of the interface, enter the text description of the image you want to generate. For example, you can enter "Kitten" to generate an image of a kitten.

3. **Advanced Options (Optional)**: If you want to customize your image further, click on the "ADVANCED" button to access additional settings. These settings allow you to fine-tune the image generation process to better match your expectations.

4. **Generate the Image**: Once you are satisfied with your prompt (and any advanced options you've set), click the "CREATE" button to start the image generation process. The AI will begin processing your prompt to generate a corresponding image.

5. **View the Result**: After a short processing time, the generated image will be displayed in the interface. If the prompt was "Kitten" but the result doesn't match your expectations (e.g., the example image shows a husky in a snowy landscape), you can try adjusting your prompt or use the advanced options for better accuracy.

Remember, the AI uses complex algorithms to interpret your text prompts and may not always produce the expected result on the first try. Feel free to experiment with different prompts and settings to achieve the best results.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker
- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vitazema/Imagine.Web.git
   cd ./Imagine.Web
   ```
2. Install the dependencies and run the development server:
   ```bash
   npm i
   npm run dev
   ```

## Built With

- [React](https://reactjs.org/) - The web framework used
- [React Router](https://reactrouter.com/) - Used for routing
- [Vite](https://vitejs.dev/) - The build tool used
- [TypeScript](https://www.typescriptlang.org/) - The language used
- [Docker](https://www.docker.com/) - Used for containerization
- [Nginx](https://www.nginx.com/) - Used for serving the application
- [Material UI (MUI)](https://mui.com/) - Used for styling

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Vitalii Malozemov** - [vitazema](https://github.com/vitazema)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- This repository is a part of the Imagine project, which aims to provide a comprehensive platform for AI-generated content. See the [Imagine API](https://github.com/Vitazema/Imagine.Api) for the backend services

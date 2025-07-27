# Contributing to React Native Swipe Cards Stack

Thank you for your interest in contributing to React Native Swipe Cards Stack! We welcome contributions from the community and appreciate your help in making this package better.

## 🤝 How to Contribute

There are many ways you can contribute:

- 🐛 **Bug Reports**: Report issues you encounter
- 💡 **Feature Requests**: Suggest new features or improvements
- 📝 **Documentation**: Improve documentation and examples
- 🔧 **Code Contributions**: Fix bugs or implement new features
- 🧪 **Testing**: Help improve test coverage
- 💬 **Community Support**: Help other users in discussions

## 🚀 Getting Started

### Prerequisites

Before contributing, make sure you have:

- Node.js (>=12.0.0)
- npm or yarn
- React Native development environment set up
- Git

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-native-swipe-cards-stack.git
   cd react-native-swipe-cards-stack
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

5. **Run linting**:
   ```bash
   npm run lint
   ```

### Project Structure

```
react-native-swipe-cards-stack/
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── SwipeableCardsStack.tsx
│   │   ├── SwipeableCard.tsx
│   │   └── SwipeIconsRenderer.tsx
│   ├── types.ts           # TypeScript type definitions
│   ├── utils.ts           # Utility functions
│   └── index.ts           # Main exports
├── lib/                   # Built output (auto-generated)
├── example/               # Example usage
├── docs/                  # Documentation
├── package.json
├── tsconfig.json
├── .eslintrc.js
├── README.md
├── CUSTOMIZATION.md
└── CONTRIBUTING.md
```

## 📝 Contributing Guidelines

### Code Style

We use ESLint and TypeScript for code quality. Please ensure your code follows our standards:

- **TypeScript**: All code should be written in TypeScript
- **ESLint**: Run `npm run lint` before submitting
- **Formatting**: Use consistent indentation (2 spaces)
- **Naming**: Use descriptive variable and function names

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvements
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process or auxiliary tools

**Examples:**
```
feat: add onTap callback for card interactions
fix: resolve gesture conflict with scroll views
docs: update README with new props
refactor: optimize card rendering performance
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Environment details**:
   - React Native version
   - Platform (iOS/Android)
   - Device/Simulator details
   - Package version
5. **Code sample** or minimal reproduction case

### Bug Report Template

```markdown
## Bug Description
Brief description of the bug.

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- React Native version: 
- Platform: iOS/Android
- Device: 
- Package version: 

## Code Sample
```tsx
// Minimal code that reproduces the issue
```

## Additional Context
Any other relevant information.
```

## 💡 Feature Requests

When suggesting features:

1. **Check existing issues** to avoid duplicates
2. **Describe the use case** and why it's needed
3. **Provide examples** of how it would be used
4. **Consider backward compatibility**
5. **Be open to discussion** about implementation

### Feature Request Template

```markdown
## Feature Description
Clear description of the proposed feature.

## Use Case
Why is this feature needed? What problem does it solve?

## Proposed API
```tsx
// Example of how the feature would be used
<SwipeableCardsStack
  newProp={value}
  // ...
/>
```

## Additional Context
Any other relevant information or alternatives considered.
```

## 🔧 Pull Requests

### Before Submitting

1. **Create an issue** first to discuss the change
2. **Fork and clone** the repository
3. **Create a feature branch**: `git checkout -b feat/your-feature-name`
4. **Make your changes** following the code style
5. **Test your changes** thoroughly
6. **Update documentation** if needed
7. **Run the build and linting**: `npm run build && npm run lint`

### Pull Request Process

1. **Create a clear title** following conventional commits
2. **Fill out the PR template** completely
3. **Link related issues** using keywords like "Fixes #123"
4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Keep the PR focused** on a single feature/fix

### Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## How Has This Been Tested?
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing on iOS
- [ ] Manual testing on Android

## Checklist
- [ ] My code follows the code style of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable)
Add screenshots or GIFs to help explain your changes.
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for new features and bug fixes
- Follow existing test patterns
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies appropriately

## 📚 Documentation

### Types of Documentation

1. **README.md**: Main usage documentation
2. **CUSTOMIZATION.md**: Advanced customization guide
3. **API Reference**: Complete prop documentation
4. **Examples**: Code samples and use cases
5. **Inline Comments**: Code documentation

### Documentation Guidelines

- Use clear, concise language
- Provide working code examples
- Keep examples up-to-date
- Use proper markdown formatting
- Include TypeScript types in examples

## 🌟 Recognition

Contributors will be recognized in:

- **README.md contributors section**
- **CHANGELOG.md** for significant contributions
- **GitHub releases** for feature contributions
- **Package.json contributors field**

## 📞 Community and Support

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community support

## 📄 License

By contributing to React Native Swipe Cards Stack, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

If you have questions about contributing, please:

1. Check this document
2. Search existing issues
3. Create a new issue with the "question" label
4. Reach out to maintainers

## 🙏 Thank You

Every contribution, no matter how small, is valuable to us. Thank you for taking the time to contribute to React Native Swipe Cards Stack!

---

**Happy Contributing! 🚀**

Made with ❤️ by [Westromakes](https://github.com/westromakes)

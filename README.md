# Reactive Truth Table Generator

A dynamic web application that generates truth tables from logical expressions written in programming syntax or plain English.

## **Premise**

The idea of this web app is to provide users with a truth table generator that dynamically constructs truth tables from logical sentences, regardless of the programming language syntax used or even if plain English is used. The web app accurately parses the sentence or string the user provides in the input field for logical operators and variables. Using the deconstructed operators, it constructs a truth table and supplies the values for each variable to output the complete truth table for the user to verify if their intended logical sentence produces the desired resultant logic.

## **Features**

- **Multi-format support**: Accepts logical expressions in various formats
  - Programming syntax: `a && b`, `!c || d`, `p ^ q`
  - Plain English: `a and b`, `not c or d`, `p equals q`
  - Logic symbols: `a ∧ b`, `¬c ∨ d`, `p ⊻ q`
- **Dynamic parsing**: Automatically detects variables and operators
- **Real-time generation**: Updates truth table as you type
- **Comprehensive operators**: Supports AND, OR, NOT, XOR, NAND, IMPLIES, and more
- **Responsive design**: Works on desktop and mobile devices

## **Setup**

### Prerequisites

- **Node.js** (v18 or higher)
- **Docker** (for containerized development)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reactive_truth_table
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Optional: Fix any security vulnerabilities**
   ```bash
   npm audit fix
   ```

## **Development**

### Local Development

```bash
# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

The development server will be available at `http://localhost:5173`

### Docker Development

#### Windows Users (.bat files)

```bash
# Build and run the app
./test.bat
# Choose option 2: "Rebuild App & Run"

# Or build specific targets
./build_docker.bat                    # Build production (default)
./build_docker.bat test              # Build test image
./build_docker.bat production my-app:v1.0  # Build with custom tag
```

#### Linux/Mac Users (.sh files)

```bash
# Make scripts executable (first time only)
chmod +x build_docker.sh
chmod +x run_tests.sh

# Build production image
./build_docker.sh

# Build test image
./build_docker.sh test

# Build with custom tag
./build_docker.sh production my-app:v1.0
```

### Hot Reload with Docker

For development with Docker hot reload:

```bash
# Linux/Mac
./build_docker.sh
docker run --network=host -v .:/app -it reactive-truth-table npm run dev -- --host

# Windows (PowerShell)
./build_docker.bat
docker run --network=host -v ${PWD}:/app -it reactive-truth-table npm run dev -- --host
```

Access the app at `http://localhost:5173`

## **Testing**

### Running All Tests

```bash
# Local testing
npm test

# Docker testing (Windows)
./test.bat
# Choose option 1: "Run Tests Only"

# Docker testing (Linux/Mac)
./build_docker.sh test
docker run --rm reactive-truth-table:test
```

### Running Specific Tests

```bash
# Run tests matching a pattern
npm test -- --grep "basic"

# Docker approach
./build_docker.sh test
docker run --rm reactive-truth-table:test npm test -- --grep "basic"
```

### Test Coverage

```bash
# Generate test coverage report
npm test -- --coverage
```

## **Usage Examples**

### Basic Logical Expressions

| Input | Description |
|-------|-------------|
| `a && b` | Logical AND in programming syntax |
| `a and b` | Logical AND in plain English |
| `a ∧ b` | Logical AND using logic symbols |
| `!a \|\| b` | Logical OR with negation |
| `not a or b` | Same as above in plain English |

### Advanced Expressions

| Input | Description |
|-------|-------------|
| `a ^ b` | Exclusive OR (XOR) |
| `a xor b` | XOR in plain English |
| `a nand b` | NAND operation |
| `a → b` | Logical implication |
| `a implies b` | Implication in plain English |
| `(a and b) or (c and d)` | Complex expression with grouping |

## **Project Structure**

```
reactive_truth_table/
├── src/
│   ├── components/         # React components
│   │   ├── TruthTable.tsx # Main truth table component
│   │   └── ui/            # UI components (buttons, cards, etc.)
│   ├── lib/               # Utility libraries
│   │   ├── truthUtils.ts  # Core logic parsing and evaluation
│   │   ├── parser.ts      # Alternative parser implementation
│   │   └── utils.ts       # General utilities
│   └── styles/            # CSS and styling
├── test/                  # Test files
├── docker/                # Docker configuration
├── build_docker.bat       # Windows Docker build script
├── build_docker.sh        # Linux/Mac Docker build script
├── test.bat              # Windows test runner
└── package.json          # Project dependencies and scripts
```

## **Docker Configuration**

The project uses a multi-stage Dockerfile:

- **Build stage**: Compiles TypeScript and builds the production bundle
- **Test stage**: Runs the test suite
- **Production stage**: Serves the app using nginx

### Available Docker Commands

```bash
# Build production image
docker build --target production -t reactive-truth-table:prod .

# Build test image
docker build --target test -t reactive-truth-table:test .

# Run production container
docker run -p 3000:80 reactive-truth-table:prod

# Run tests in container
docker run --rm reactive-truth-table:test
```

## **Supported Operators**

| Operator | Syntax Options | Description |
|----------|----------------|-------------|
| AND | `&&`, `and`, `∧` | Logical conjunction |
| OR | `\|\|`, `or`, `∨` | Logical disjunction |
| NOT | `!`, `not`, `¬` | Logical negation |
| XOR | `^`, `xor`, `⊻`, `⊕` | Exclusive or |
| NAND | `nand`, `⊼` | Not and |
| EQUALS | `==`, `equals`, `↔` | Logical equivalence |
| IMPLIES | `implies`, `→` | Logical implication |

## **Troubleshooting**

### Common Issues

1. **Port already in use**
   ```bash
   # Use a different port
   docker run -p 8080:80 reactive-truth-table:prod
   ```

2. **Permission denied on scripts**
   ```bash
   # Linux/Mac: Make scripts executable
   chmod +x build_docker.sh run_tests.sh
   ```

3. **Docker build fails**
   ```bash
   # Clean Docker cache and rebuild
   docker system prune -f
   ./build_docker.bat  # or ./build_docker.sh
   ```

### Debug Mode

For verbose Docker build output:
```bash
# The build scripts include debug output by default
./build_docker.bat test    # Shows detailed build information
```

## **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run the test suite: `npm test`
5. Commit your changes: `git commit -m "Add feature"`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## **License**

Copyright 2025 Johhannas Reyn

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## **Contact**

Admin@DreamEmbedded.com
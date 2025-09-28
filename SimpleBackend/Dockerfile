FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["SimpleBackend/SimpleBackend.csproj", "SimpleBackend/"]
RUN dotnet restore "SimpleBackend/SimpleBackend.csproj"

COPY . .
WORKDIR "/src/SimpleBackend"

RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "SimpleBackend.dll"]
EXPOSE 80